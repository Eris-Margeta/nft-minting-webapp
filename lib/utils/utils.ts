import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {PublicKey} from "@solana/web3.js";
import fetchRetry from "fetch-retry";
import type {DasApiAsset} from "@metaplex-foundation/digital-asset-standard-api"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getAsset = async (id: string, url: string): Promise<DasApiAsset & {
    token_info?: {
        decimals?: number,
    }
}> => {
    const response =  await fetchRetry(fetch)(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        retryOn: [429],
        retryDelay: 2000,
        retries: 10,
        body: JSON.stringify({
            jsonrpc: '2.0',
            id: 'my-id',
            method: 'getAsset',
            params: {
                id
            },
        }),
    });
    const { result } = await response.json();
    return result
};


export const pluralize = (count: number, noun: string, suffix = 's') =>
  `${count} ${noun}${count !== 1 ? suffix : ''}`;