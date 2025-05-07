import {AddressLookupTableProgram, PublicKey} from "@solana/web3.js";
import {
    HASHLIST,
    HASHLIST_MARKER,
    PROGRAM_ID_CM,
    PROGRAM_ID_FAIR_LAUNCH,
    PROGRAM_ID_LIQUIDITY,
    PROGRAM_ID_METADATA
} from "../../../lib/anchor/constants";
import {Buffer} from "buffer";
import BN from "bn.js";

const DEPLOYMENT = "deployment";

export const getDeploymentPda = (ticker: String) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from(DEPLOYMENT), Buffer.from(ticker)],
        new PublicKey(PROGRAM_ID_FAIR_LAUNCH)
    )[0];
};

export const getDeploymentConfigPda = (deployment: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("deployment_config"), deployment.toBuffer()],
        new PublicKey(PROGRAM_ID_FAIR_LAUNCH)
    )[0];
};

export function getLiquidityPda(seed: PublicKey) {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("liquidity"), seed.toBuffer()],
        new PublicKey(PROGRAM_ID_LIQUIDITY)
    )[0];
}

export const getLegacyMetadataPda = (mint: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), PROGRAM_ID_METADATA.toBuffer(), mint.toBuffer()],
        PROGRAM_ID_METADATA
    )[0];
};

export function getMasterEditionPda(tokenMint: PublicKey) {
    return PublicKey.findProgramAddressSync(
        [
            Buffer.from("metadata"),
            PROGRAM_ID_METADATA.toBuffer(),
            tokenMint.toBuffer(),
            Buffer.from("edition"),
        ],
        PROGRAM_ID_METADATA
    )[0];
}

export function getTotalMintsPda(wallet: string, phase: string, machine: string) {
    return PublicKey.findProgramAddressSync([Buffer.from("TotalMints"), new PublicKey(wallet).toBuffer(),
        new PublicKey(machine).toBuffer(), Buffer.from(phase).subarray(0, 32)], new PublicKey(PROGRAM_ID_CM))[0]
}

export function getMachinePda(seed: PublicKey) {
    return PublicKey.findProgramAddressSync([Buffer.from("machine"), seed.toBuffer()], new PublicKey(PROGRAM_ID_CM))[0]
}

export function getMultiplierPda(machine: PublicKey) {
    return PublicKey.findProgramAddressSync([Buffer.from("multipliers"), machine.toBuffer()], new PublicKey(PROGRAM_ID_CM))[0]
}

export function getLookupTablePda(authority: PublicKey, slot: number) {
    return PublicKey.findProgramAddressSync([authority.toBuffer(), Buffer.from((new BN(slot)).toArray("le", 8))], AddressLookupTableProgram.programId)[0]
}

export const getHashlistMarkerPda = (deployment: PublicKey, mint: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from(HASHLIST_MARKER), deployment.toBuffer(), mint.toBuffer()],
        new PublicKey(PROGRAM_ID_FAIR_LAUNCH)
    )[0];
};

export const getHashlistPda = (deployment: PublicKey) => {
    return PublicKey.findProgramAddressSync(
        [Buffer.from(HASHLIST), deployment.toBuffer()],
        new PublicKey(PROGRAM_ID_FAIR_LAUNCH)
    )[0];
};
export function getRoyaltyListAccount(machine: PublicKey) {
    return PublicKey.findProgramAddressSync([Buffer.from("royalty_list"), machine.toBuffer()], new PublicKey(PROGRAM_ID_CM))[0]
}

