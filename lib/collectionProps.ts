import {GetStaticProps} from "next";
import {Connection, PublicKey, SystemProgram} from "@solana/web3.js";
import {AnchorProvider, IdlAccounts, Program} from "@coral-xyz/anchor";
import {CompressedMinter, IDL as CandyMachineIdl} from "../lib/anchor/idl/compressed_minter";
import {PROGRAM_ID_CM, PROGRAM_ID_FAIR_LAUNCH, PROGRAM_ID_LIQUIDITY} from "../lib/anchor/constants";
import {IDL as FairLaunchIdl} from "../lib/anchor/idl/libreplex_fair_launch";
import {IDL as LiquidityIdl} from "../lib/anchor/idl/libreplex_liquidity";
import {getDeploymentConfigPda, getLookupTablePda} from "../lib/anchor/pda/pda";
import {useMemo} from "react";
import {WalletAdapterNetwork} from "@solana/wallet-adapter-base";
import { DeploymentData } from "./minterProps";

const pathNetwork: Record<string, string> = {
    "d": process.env.NEXT_PUBLIC_DEFAULT_RPC_DEVNET!,
    "m": process.env.NEXT_PUBLIC_DEFAULT_RPC_MAINNET!
}
export type MachineType = {
    type: "compressed"
    collection: string,
} | {
    type: "liquid",
    url: string,
    liquidity: string,
} | {
    type: "fairlaunch",
    deployment: string,
}
export type MachineData = {
    key: string,
    name: string,
    symbol: string,
    supply: number,
    url: string,
    authority: string,
    lookupTable: string,
}


type DeploymentConfigData = {
    key: string,
    cosignerProgram: string,
    fee: number,
    treasury: string,
    multiplierLimit: {
        maxNumerator: number,
        minDemominator: number,
    } | null,
}

export type CollectionPageProps = {
    machineType: MachineType,
    machineData: MachineData,
   
    deploymentConfigData: DeploymentConfigData | null,
  
}


export const getCollectionStaticProps: GetStaticProps<CollectionPageProps> = async (
    context
) => {
    const network = process.env.NEXT_PUBLIC_NETWORK
    const id = process.env.NEXT_PUBLIC_ID_PROJECT

    const rpcUrl = pathNetwork[network as string]

    if (!rpcUrl) {
        return {
            revalidate: 1,
            notFound: true,
        }
    }

    const connection = new Connection(rpcUrl)

    const cmInfo = await connection.getAccountInfo(new PublicKey(id as string))

    if (!cmInfo) {
        return {
            revalidate: 1,
            notFound: true,
        }
    }

    const cmProg = new Program(CandyMachineIdl, PROGRAM_ID_CM, new AnchorProvider(connection, undefined as any, {}))
    const fairLaunchProg = new Program(FairLaunchIdl, PROGRAM_ID_FAIR_LAUNCH, new AnchorProvider(connection, undefined as any, {}))
    const liqProg = new Program(LiquidityIdl, PROGRAM_ID_LIQUIDITY, new AnchorProvider(connection, undefined as any, {}))


    const machineData: IdlAccounts<CompressedMinter>["mintMachine"] = cmProg.coder.accounts.decode("mintMachine", cmInfo.data)

    let deploymentData: DeploymentData | null = null;
    let deploymentConfigData: DeploymentConfigData | null = null;

    let liquidityKey = null;
    if (machineData.machineType.liquid) {
        liquidityKey = machineData.machineType.liquid.liquidity.toString()
        const liquidity = await liqProg.account.liquidity.fetchNullable(machineData.machineType.liquid.liquidity)

        if (!liquidity) {
            return {
                revalidate: 1,
                notFound: true,
            }
        }

        const deployment = await fairLaunchProg.account.deployment.fetchNullable(liquidity.deployment)

        if (!deployment) {
            return {
                revalidate: 1,
                notFound: true,
            }
        }


        const configKey = getDeploymentConfigPda(liquidity.deployment)
        const deploymentConfig = await fairLaunchProg.account.deploymentConfig.fetchNullable(configKey)

        if (!deploymentConfig) {
            return {
                revalidate: 1,
                notFound: true,
            }
        }

        let imageUrl = null;

        try {
            const resp = await fetch(deployment.offchainUrl)


            if (resp.ok) {
                imageUrl = (await resp.json()).image || null
            }
        } catch (e) {
            // console.log(e)
        }


        // console.log(deployment)
        deploymentData = {
            creatorFeeTreasury: deploymentConfig.creatorFeeTreasury.toString(),
            key: liquidity.deployment.toString(),
            fungibleMint: deployment.fungibleMint.toString(),
            ticker: deployment.ticker,
            tokensPerMint: deployment.limitPerMint.toNumber(),
            useInscriptions: deployment.useInscriptions,
            imageUrl,
            jsonUrl: deployment.offchainUrl,
        }

        // console.log(deploymentData)

        deploymentConfigData = {
            key: configKey.toString(),
            cosignerProgram: deploymentConfig.cosignerProgramId.toString(),
            fee: deploymentConfig.creatorFeePerMintLamports.toNumber(),
            multiplierLimit: deploymentConfig.multiplierLimits ? {
                maxNumerator: deploymentConfig.multiplierLimits.maxNumerator,
                minDemominator: deploymentConfig.multiplierLimits.minDenominator,
            } : null,
            treasury: deploymentConfig.creatorFeeTreasury.toString(),
        }
    } else if (machineData.machineType.fairLaunch) {
        const deployment = await fairLaunchProg.account.deployment.fetchNullable(machineData.machineType.fairLaunch.deployment)
        if (!deployment) {
            return {
                revalidate: 1,
                notFound: true,
            }
        }


        const configKey = getDeploymentConfigPda(machineData.machineType.fairLaunch.deployment)
        const deploymentConfig = await fairLaunchProg.account.deploymentConfig.fetchNullable(configKey)
        if (!deploymentConfig) {
            return {
                revalidate: 1,
                notFound: true,
            }
        }

        let imageUrl = null;

        try {
            const resp = await fetch(deployment.offchainUrl)

            if (resp.ok) {
                imageUrl = (await resp.json()).image  || null
            }
        } catch (e) {
            // console.log(e)
        }

        deploymentData = {
            key: machineData.machineType.fairLaunch.deployment.toString(),
            fungibleMint: deployment.fungibleMint.toString(),
            ticker: deployment.ticker,
            tokensPerMint: deployment.limitPerMint.toNumber(),
            useInscriptions: deployment.useInscriptions,
            imageUrl,
            creatorFeeTreasury: deploymentConfig.creatorFeeTreasury.toString(),
            jsonUrl: deployment.offchainUrl,
        }
        // console.log(deploymentData)

        deploymentConfigData = {
            key: configKey.toString(),
            cosignerProgram: deploymentConfig.cosignerProgramId.toString(),
            fee: deploymentConfig.creatorFeePerMintLamports.toNumber(),
            multiplierLimit: deploymentConfig.multiplierLimits ? {
                maxNumerator: deploymentConfig.multiplierLimits.maxNumerator,
                minDemominator: deploymentConfig.multiplierLimits.minDenominator,
            } : null,
            treasury: deploymentConfig.creatorFeeTreasury.toString(),
        }

    }

    if (deploymentData?.fungibleMint === SystemProgram.programId.toString()) {
        return {
            revalidate: 1,
            notFound: true,
        }
    }


    return {
        props: {
            deploymentConfigData,
            deploymentData,
            machineType: machineData.machineType.compressed ? {
                type: "compressed",
                collection: machineData.machineType.compressed.collection.toString(),
            } : machineData.machineType.fairLaunch ? {
                type: "fairlaunch",
                deployment: machineData.machineType.fairLaunch.deployment.toString(),
            } : {
                type: "liquid",
                url: machineData.machineType.liquid.url,
                liquidity: machineData.machineType.liquid.liquidity.toString(),
            },
            liquidity: liquidityKey,
            machineData: {
                key: id as string,
                lookupTable: machineData.data.authority.toString() === "Ea23HTcVeDSGk2uiLMK67Nn5LERujtLZTxncTZYp9WYm" ? getLookupTablePda(new PublicKey("6TsV2bCNGZfooyvFXx8UAmnoMn8guW8CgjdR44EmqVRt"), machineData.tableSlot.toNumber()).toString() : getLookupTablePda(machineData.data.authority, machineData.tableSlot.toNumber()).toString(),
                url: machineData.data.url,
                name: machineData.data.name,
                supply: machineData.data.supply,
                symbol: machineData.data.symbol,
                authority: machineData.data.authority.toString(),
            },
            receivers: machineData.fundReceivers.map(a => {
                return {
                    address: a.address.toString(),
                    share: a.share,
                }
            }),

        }
    }
}