import {IdlAccounts, Program} from "@coral-xyz/anchor";
import {CompressedMinter} from "../../lib/anchor/idl/compressed_minter";
import {LibreplexFairLaunch} from "../../lib/anchor/idl/libreplex_fair_launch";
import {LibreplexLiquidity} from "../../lib/anchor/idl/libreplex_liquidity";
import {WalletContextState} from "@solana/wallet-adapter-react";
import {
    ComputeBudgetProgram,
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    SYSVAR_INSTRUCTIONS_PUBKEY,
    SYSVAR_SLOT_HASHES_PUBKEY, TransactionInstruction
} from "@solana/web3.js";

import {getExtraAccountMetaAddress} from "@solana/spl-token"
import BN from "bn.js";
import {
    BUBBLE_GUM_PROGRAM_ID, FEE_KEY, GLOBAL_DENY_LIST_ID,
    PROGRAM_ID_FAIR_LAUNCH,
    PROGRAM_ID_LIQUIDITY,
    PROGRAM_ID_METADATA, PROGRAM_ID_ROYALTY_HOOK
} from "../../lib/anchor/constants";

import {
    ASSOCIATED_TOKEN_PROGRAM_ID,
    getAssociatedTokenAddressSync,
    TOKEN_2022_PROGRAM_ID,
    TOKEN_PROGRAM_ID
} from "@solana/spl-token";
import {
    getDeploymentConfigPda,
    getHashlistMarkerPda,
    getHashlistPda,
    getMultiplierPda, getRoyaltyListAccount,
    getTotalMintsPda
} from "../../lib/anchor/pda/pda";
import {SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID} from "@solana/spl-account-compression";
import {sendVTxs} from "../../lib/utils/tx";
import { FundReceivers } from "../minterProps";

type MintInput = {
    programs: {
        candyMachine: Program<CompressedMinter>,
        fairLaunch: Program<LibreplexFairLaunch>,
        liquidity: Program<LibreplexLiquidity>,
    },
    machineInfo: {
        machine: string,
        machineAuthority: string,
        fungibleMint: string,
        liquidity: string | null,
        deployment: string,
        creatorFeeTreasury: string,
    },
    fundReceivers: FundReceivers,
    wallet: WalletContextState,
    lookupTable: PublicKey,
    dasUrl: string,
    connection: Connection,
    prioFeeUrl: string,
    targetPhase: number,
    targetPhaseName: string,
    proof: number[][] | null,
    expectedPrice: BN
}

export async function mintIx(input: MintInput) {
    const {
        expectedPrice,
        prioFeeUrl,

        programs,
        proof,
        dasUrl,
        targetPhaseName,
        targetPhase,
        machineInfo,
        wallet,
        fundReceivers,
        connection,
        lookupTable
    } = input;

    const {machine, machineAuthority, fungibleMint, deployment, liquidity} = machineInfo;

    const userMintKp = Keypair.generate()
    const userMint = userMintKp.publicKey
    const userTokenAccount = getAssociatedTokenAddressSync(userMint, wallet.publicKey!, false, TOKEN_2022_PROGRAM_ID)

    const pooledMintKp = Keypair.generate()
    const pooledMint = pooledMintKp.publicKey

    // const test = new Array<number[]>(10).fill(new Array(32).fill(1))
    let ix: TransactionInstruction;
    if (liquidity) {
        ix = await programs.candyMachine.methods.t22LiquidMint({
            amount: 1,
            proof: proof || [],
            expectedPrice,
            cnftWlEntry: null,
            targetPhase,
        }).accounts({
            nonFungibleMint: userMint,
            globalDenyListAccount: GLOBAL_DENY_LIST_ID,
            libreplexRoyaltyHook: PROGRAM_ID_ROYALTY_HOOK,
            pooledRoyaltyHookExtraAccountMeta: getExtraAccountMetaAddress(pooledMint, PROGRAM_ID_ROYALTY_HOOK),
            royaltyHookExtraAccountMeta: getExtraAccountMetaAddress(userMint, PROGRAM_ID_ROYALTY_HOOK),
            nonFungibleTokenAccount: userTokenAccount,
            buyer: wallet.publicKey!,
            collectionRoyaltyListAccount: getRoyaltyListAccount(new PublicKey(machine)),
            totalMints: getTotalMintsPda(wallet.publicKey!.toString(), targetPhaseName, machine),
            hashlistMarker: getHashlistMarkerPda(new PublicKey(deployment), userMint),
            pooledHashlistMarket: getHashlistMarkerPda(new PublicKey(deployment), pooledMint),
            pooledNonFungibleMint: pooledMint,
            deploymentNonFungibleTokenAccount: getAssociatedTokenAddressSync(pooledMint, new PublicKey(deployment), true, TOKEN_2022_PROGRAM_ID),
            pooledNonFungibleTokenAccount: getAssociatedTokenAddressSync(pooledMint, new PublicKey(liquidity), true, TOKEN_2022_PROGRAM_ID),
            machine,
            wallet: machineInfo.creatorFeeTreasury,
            fairLaunch: PROGRAM_ID_FAIR_LAUNCH,
            liquidity: liquidity,
            systemProgram: SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            deployment,
            deploymentConfig: getDeploymentConfigPda(new PublicKey(deployment)),
            fungibleMint,
            token22Program: TOKEN_2022_PROGRAM_ID,
            multipliers: getMultiplierPda(new PublicKey(machine)),
            hashlist: getHashlistPda(new PublicKey(deployment)),
            recentSlothashes: SYSVAR_SLOT_HASHES_PUBKEY,
            liquidityProgram: PROGRAM_ID_LIQUIDITY,
            noopProgram: SPL_NOOP_PROGRAM_ID,
            wlNftTreeAuthority: null,
            wlNftTree: null,
            requiredSigner: wallet.publicKey!,
            buyerPaymentTokenWallet: null,
            whitelistMint: null,
            wlNftMetadata: null,
            buyerWlTokenWallet: null,
            mintsPerWlNft: null,
            bubblegumProgram: BUBBLE_GUM_PROGRAM_ID,
            instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY,
            accountCompressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            tokenMetadataProgram: PROGRAM_ID_METADATA,
            deploymentFungibleTokenAccount: getAssociatedTokenAddressSync(new PublicKey(fungibleMint), new PublicKey(deployment), true),
            wallet2: FEE_KEY,
            liquidityFungibleTokenAccount: getAssociatedTokenAddressSync(new PublicKey(fungibleMint), new PublicKey(liquidity), true),
        }).remainingAccounts(fundReceivers.map(f => {
            return {
                pubkey: new PublicKey(f.address),
                isSigner: false,
                isWritable: true,
            }
        })).instruction()
    }
    else {
        ix = await programs.candyMachine.methods.fairlaunchMint({
            amount: 1,
            proof: proof || [],
            expectedPrice,
            cnftWlEntry: null,
            targetPhase,
        }).accounts({
            libreplexRoyaltyHook: PROGRAM_ID_ROYALTY_HOOK,
            royaltyHookExtraAccountMeta: getExtraAccountMetaAddress(userMint, PROGRAM_ID_ROYALTY_HOOK),
            nonFungibleMint: userMint,
            nonFungibleTokenAccount: userTokenAccount,
            buyer: wallet.publicKey!,
            totalMints: getTotalMintsPda(wallet.publicKey!.toString(), targetPhaseName, machine),
            hashlistMarker: getHashlistMarkerPda(new PublicKey(deployment), userMint),
            deploymentNonFungibleTokenAccount: getAssociatedTokenAddressSync(pooledMint, new PublicKey(deployment), true, TOKEN_2022_PROGRAM_ID),
            machine,
            wallet: input.machineInfo.creatorFeeTreasury,
            fairLaunch: PROGRAM_ID_FAIR_LAUNCH,
            systemProgram: SystemProgram.programId,
            associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
            tokenProgram: TOKEN_PROGRAM_ID,
            deployment,
            deploymentConfig: getDeploymentConfigPda(new PublicKey(deployment)),
            fungibleMint,
            token22Program: TOKEN_2022_PROGRAM_ID,
            multipliers: getMultiplierPda(new PublicKey(machine)),
            hashlist: getHashlistPda(new PublicKey(deployment)),
            recentSlothashes: SYSVAR_SLOT_HASHES_PUBKEY,
            noopProgram: SPL_NOOP_PROGRAM_ID,
            wlNftTreeAuthority: null,
            wlNftTree: null,
            requiredSigner: wallet.publicKey!,
            buyerPaymentTokenWallet: null,
            whitelistMint: null,
            wlNftMetadata: null,
            buyerWlTokenWallet: null,
            mintsPerWlNft: null,
            bubblegumProgram: BUBBLE_GUM_PROGRAM_ID,
            instructionSysvarAccount: SYSVAR_INSTRUCTIONS_PUBKEY,
            accountCompressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            tokenMetadataProgram: PROGRAM_ID_METADATA,
            deploymentFungibleTokenAccount: getAssociatedTokenAddressSync(new PublicKey(fungibleMint), new PublicKey(deployment), true),
            wallet2: FEE_KEY,
        }).remainingAccounts(fundReceivers.map(f => {
            return {
                pubkey: new PublicKey(f.address),
                isSigner: false,
                isWritable: true,
            }
        })).instruction()
    }

    const signers = [userMintKp]

    if (liquidity) {
        signers.push(pooledMintKp)
    }

    return {
        ixs: [ComputeBudgetProgram.setComputeUnitLimit({
            units: 1_000_000,
        }),ix],
        signers,
    }
}

export async function mint(input: MintInput, amount: number, onTx: () => Promise<void>) {
    const lookupTableAccount = input.connection.getAddressLookupTable(input.lookupTable).then(r => r.value)
    // console.log('start mint')
    const txs = await Promise.all(new Array(amount).fill(0).map(async () => {
        const {ixs, signers} = await mintIx(input)
        return {
            ixs,
            signers,
            onTx,
        }
    }))
    
    // console.log('end mint: ')
    // console.log(txs)
    const aaa = sendVTxs(txs, input.connection, input.prioFeeUrl, input.wallet as any, (await lookupTableAccount)!, 20, true, true)

    // console.log('aaa')
    // console.log(aaa)
    return aaa
}
