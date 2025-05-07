import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

import Layout from "../src/layout/Layout";

import { useDasUrl, useNetwork } from "../src/components/wallet/SolanaProvider";
import {
	CollectionPageProps,
	getCollectionStaticProps,
} from "../lib/collectionProps";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
	PublicKey,
	SystemProgram,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import usePrograms from "../lib/anchor/usePrograms";
import useCandyMachineQuery from "../lib/useCandyMachineQuery";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PROGRAM_ID_ROYALTY_HOOK } from "../lib/anchor/constants";
import { getRoyaltyListAccount } from "../lib/anchor/pda/pda";
import { sendTxs } from "../lib/utils/tx";
import { getTotalMintsPda } from "../lib/anchor/pda/pda";
import { useQuery } from "@tanstack/react-query";
import { mint } from "../lib/anchor/mint";

import MintStatusDialog from "../src/components/popup/MintDialog";

export const getStaticProps = getCollectionStaticProps;

export const prioFeeUrl = "https://rahel-v0lqwp-fast-mainnet.helius-rpc.com/";

export function useMyMints(phase, machine) {
	const wallet = useWallet();
	const { connection } = useConnection();
	const programs = usePrograms();

	return useQuery({
		queryKey: [
			"MyMints",
			wallet.publicKey ? wallet.publicKey.toString() : null,
			phase?.name,
			machine,
			connection.rpcEndpoint,
		],
		queryFn: async () => {
			if (!wallet.publicKey) {
				return {
					amt: 0,
				};
			}

			const totalMintsPda = getTotalMintsPda(
				wallet.publicKey.toString(),
				phase.name,
				machine
			);
			const totalMintsAccount =
				await programs.candyMachine.account.totalMints.fetchNullable(
					totalMintsPda
				);
			const totalMints = totalMintsAccount ? totalMintsAccount.total : 0;

			return {
				amt: totalMints,
			};
		},
	});
}

const NftSingle = ({
	machineData,
	deploymentData,
	deploymentConfigData,
	receivers,
	liquidity,
	machineType,
}) => {
	const router = useRouter();
	const wallet = useWallet();
	const { setVisible } = useWalletModal();

	const { setNetwork } = useNetwork();
	const [mintStatus, setMintStatus] = useState(undefined);

	const [mintedNFTs, setMintedNFTs] = useState([]);

	const [minted, setMinted] = useState(false);

	useEffect(() => {
		if (process.env.NEXT_PUBLIC_NETWORK === "d") {
			setNetwork(WalletAdapterNetwork.Devnet);
		} else if (process.env.NEXT_PUBLIC_NETWORK === "m") {
			setNetwork(WalletAdapterNetwork.Mainnet);
		}
	}, [setNetwork]);

	// Effect to handle redirection on `minted` change
	useEffect(() => {
		if (minted && mintedNFTs.length > 0) {
			const mintSuccessQuery = { query: { "mint-success": true } };
			if (process.env.NEXT_PUBLIC_HIDE_NFT_PREVIEW === "true") {
				router.push({
					pathname: "/collection",
					...mintSuccessQuery,
				});
			} else {
				router.push({
					pathname: `/nftmint/${mintedNFTs[0]}`,
					...mintSuccessQuery,
				});
			}
		}
	}, [minted, mintedNFTs, router]);

	const [quantity, setQuantity] = useState(1);

	const handleIncrease = () => {
		setQuantity((prevQuantity) => Math.min(prevQuantity + 1, 5));
	};

	const handleDecrease = () => {
		setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
	};

	const totalSupply = 11795;

	const dasUrl = useDasUrl();

	const { connection } = useConnection();
	const programs = usePrograms();

	const cmQuery = useCandyMachineQuery(
		process.env.NEXT_PUBLIC_ID_PROJECT,
		5000
	);

	const apesSold = cmQuery?.data?.sold;

	const salePhase = cmQuery?.data?.salePhases[process.env.NEXT_PUBLIC_PHASE_ID];
	const pricePerItem = salePhase
		? salePhase?.price.toNumber() / 1000000000
		: 0.3;
	const totalPrice = quantity * pricePerItem;

	const myMintsQuery = useMyMints(
		salePhase,
		process.env.NEXT_PUBLIC_ID_PROJECT
	);

	const doMint = useCallback(
		async (
			phaseName,
			phaseIndex,
			proof,
			expectedPrice,
			symbol,
			decimals,
			amount
		) => {
			setMintStatus({
				error: undefined,
				symbol,
				price: pricePerItem,
				items: `${amount} Midnight Apes`,
			});

			setMintedNFTs([]);

			try {
				const a = await mint(
					{
						wallet,
						connection,
						prioFeeUrl,
						fundReceivers: receivers,
						proof,
						lookupTable: new PublicKey(machineData.lookupTable),
						targetPhase: 0,
						targetPhaseName: phaseName,
						dasUrl,
						programs,
						expectedPrice,
						machineInfo: {
							creatorFeeTreasury: deploymentData.creatorFeeTreasury,
							machine: machineData.key,
							fungibleMint: deploymentData.fungibleMint,
							deployment: deploymentData.key,
							machineAuthority: machineData.authority,
							liquidity: liquidity,
						},
					},
					amount,
					async () => {}
				);

				setMintedNFTs(a);

				setTimeout(() => {
					cmQuery.refetch();
				}, 2000);

				setMintStatus((prevState) => {
					if (!prevState) {
						return undefined;
					}

					return {
						...prevState,
						done: true,
					};
				});
			} catch (e) {
				setMintStatus((prevState) => {
					if (!prevState) {
						return undefined;
					}

					setMintedNFTs([]);

					return {
						...prevState,
						error: e.message ? e.message : "Mint failed, please try again",
					};
				});
			}
		},
		[
			connection,
			dasUrl,
			deploymentData,
			liquidity,
			machineData.authority,
			machineData.key,
			machineData.lookupTable,
			programs,
			receivers,
			wallet,
			cmQuery,
		]
	);

	return (
		<Layout pageTitle={"Minting"}>
			<div className="metaportal_fn_mintpage">
				<div className="container small -mt-20 lg:-mt-32">
					<div className="metaportal_fn_mint_top">
						<div className="mint_left">
							<div className="img">
								<div className="img_in" data-bg-img="/img/about/1.jpg">
									<img src="/img/about/1.jpg" alt="" />
								</div>
							</div>
						</div>
						<div className="mint_right">
							<h3
								className="fn__maintitle"
								data-text="Midnight Apes Mint"
								data-align="left"
							>
								Midnight Apes Mint
							</h3>
							<div className="metaportal_fn_mintbox">
								<div className="mint_left">
									<div className="mint_title">
										<span>Public Mint is Live</span>
									</div>
									<div className="mint_list">
										<ul>
											<li>
												<div className="item">
													<h4>Price</h4>
													<h3>{pricePerItem} SOL</h3>
												</div>
											</li>
											<li>
												<div className="item">
													<h4>Remaining</h4>
													<h3>
														{totalSupply - apesSold}/{totalSupply}
													</h3>
												</div>
											</li>
											<li>
												<div className="item">
													<h4>Quantity</h4>
													<div className="qnt">
														<span className="decrease" onClick={handleDecrease}>
															-
														</span>
														<span className="summ" data-price={pricePerItem}>
															{quantity}
														</span>
														<span className="increase" onClick={handleIncrease}>
															+
														</span>
													</div>
												</div>
											</li>
											<li>
												<div className="item">
													<h4>Total Price</h4>
													<h3>
														<span className="total_price">
															{totalPrice.toFixed(1)}
														</span>{" "}
														SOL
													</h3>
												</div>
											</li>
										</ul>
									</div>
									{wallet.publicKey && (
										<div className="mint_desc">
											<div
												className="metaportal_fn_button"
												onClick={async () => {
													await doMint(
														salePhase.name,
														process.env.NEXT_PUBLIC_PHASE_ID,
														null,
														salePhase.price,
														"SOL",
														9,
														quantity
													);

													setTimeout(() => {
														myMintsQuery.refetch();
													}, 2000);

													setTimeout(() => {
														myMintsQuery.refetch();
													}, 5000);
												}}
											>
												<span>Mint Now</span>
											</div>
										</div>
									)}
									{!wallet.publicKey && (
										<div className="mint_desc">
											<div
												onClick={async () => {
													setVisible(true);
												}}
												className="metaportal_fn_button"
											>
												<span>Connect wallet</span>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{mintStatus && (
				<MintStatusDialog
					status={mintStatus}
					onClose={() => {
						setMintStatus(undefined);
						setMinted(true);
					}}
				/>
			)}
		</Layout>
	);
};
export default NftSingle;
