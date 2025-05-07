import {useQuery} from "@tanstack/react-query";
import {useConnection} from "@solana/wallet-adapter-react";
import usePrograms from "../lib/anchor/usePrograms";

export default function useCandyMachineQuery(id: string, interval?: number) {

    const {connection} = useConnection()
    const {candyMachine} = usePrograms()
    return useQuery({
        queryKey: [id, connection.rpcEndpoint],
        queryFn: async () => {
            return candyMachine.account.mintMachine.fetchNullable(id as string)
        },
        refetchInterval: interval,
    })
}