import {useConnection} from "@solana/wallet-adapter-react";
import {useMemo} from "react";
import {AnchorProvider, Program} from "@coral-xyz/anchor";

import {IDL as CandyMachineIdl} from "../../lib/anchor/idl/compressed_minter"
import {IDL as FairLaunchIdl} from "../../lib/anchor/idl/libreplex_fair_launch"
import {IDL as LiquidityIdl} from "../../lib/anchor/idl/libreplex_liquidity"
import {PROGRAM_ID_CM, PROGRAM_ID_FAIR_LAUNCH, PROGRAM_ID_LIQUIDITY} from "../../lib/anchor/constants";


export default function usePrograms() {
    const {connection} = useConnection()

    const candyMachine = useMemo(() => {
        return new Program(CandyMachineIdl, PROGRAM_ID_CM, new AnchorProvider(connection, undefined as any, {}))
    }, [connection])

    const fairLaunch = useMemo(() => {
        return new Program(FairLaunchIdl, PROGRAM_ID_FAIR_LAUNCH, new AnchorProvider(connection, undefined as any, {}))
    }, [connection])

    const liquidity = useMemo(() => {
        return new Program(LiquidityIdl, PROGRAM_ID_LIQUIDITY, new AnchorProvider(connection, undefined as any, {}))
    }, [connection])

    return {
        candyMachine,
        fairLaunch,
        liquidity
    }
}