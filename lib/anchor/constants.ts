import {PublicKey} from "@solana/web3.js";

export const PROGRAM_ID_LIQUIDITY =
    "LiquGRWGrp8JKspo8zDDu6qpRmX1p6U3PX2USqiE1eg";
export const PROGRAM_ID_FAIR_LAUNCH = "8bvPnYE5Pvz2Z9dE6RAqWr1rzLknTndZ9hwvRE6kPDXP";
export const PROGRAM_ID_CM = "F9SixdqdmEBP5kprp2gZPZNeMmfHJRCTMFjN22dx3akf"


export const PROGRAM_ID_METADATA = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s")

export const DEPLOYMENT_TYPE_2022 = 3;
export const DEPLOYMENT_TYPE_HYBRID = 4;

export const LIQUIDITY_DEPLOYMENT_TYPE_NFT = 0;
export const LIQUIDITY_DEPLOYMENT_TYPE_SPL = 1;

export const LIQUIDITY_DEPLOYMENT_TYPE_NFT_JOIN = 2;

export const BUBBLE_GUM_PROGRAM_ID = new PublicKey("BGUMAp9Gq7iTEuizy4pqaxsTyUCBK68MDfK752saRPUY")

export const GLOBAL_TABLE_DEV = new PublicKey("5VQLd2DrLHynrWPrEePbwJgP6VZTBLhBzkEciK9E5gXp")

export const HASHLIST = "hashlist";
export const HASHLIST_MARKER = "hashlist_marker";

export const FEE_KEY = new PublicKey("HkgFZhsuqdppyCeSVctivp4R73TbSewPRMqBVJ52nFNm")

export const PROGRAM_ID_ROYALTY_HOOK = new PublicKey("CZ1rQoAHSqWBoAEfqGsiLhgbM59dDrCWk3rnG5FXaoRV")


export const GLOBAL_DENY_LIST_ID = PublicKey.findProgramAddressSync([Buffer.from("global_deny_list")], PROGRAM_ID_ROYALTY_HOOK)[0]