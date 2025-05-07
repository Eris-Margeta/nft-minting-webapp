// import { MintStatus } from "../src/components/popup/MintDialog"
import { Dispatch, SetStateAction } from "react"


export type MachineData = {
    key: string,
    name: string,
    symbol: string,
    supply: number,
    url: string,
    authority: string,
    lookupTable: string,
}

export type FundReceivers = {
    share: number,
    address: string,
}[]

export type DeploymentData = {
    key: string,
    fungibleMint: string,
    tokensPerMint: number,
    useInscriptions: boolean,
    ticker: string,
    jsonUrl: string,
    imageUrl: string | null,
    creatorFeeTreasury: string,
}


export type MinterProps = {
    machineData: MachineData,
    liquidity: string | null,
    deploymentData: DeploymentData | null, 
    receivers: FundReceivers,
    setMintStatus: Dispatch<SetStateAction<MintStatus|undefined>>

    
}



