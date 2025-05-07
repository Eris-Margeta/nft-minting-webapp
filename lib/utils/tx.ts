import {Wallet} from "@coral-xyz/anchor";
import {
    AccountMeta,
    AddressLookupTableAccount,
    ComputeBudgetProgram, Keypair,
    TransactionInstruction, TransactionMessage,
    VersionedTransaction
} from "@solana/web3.js";
import _ from "lodash"
import { parallel } from "async"
import {Commitment, Connection, SignatureStatus, Transaction, TransactionSignature} from "@solana/web3.js";
const DEFAULT_TIMEOUT = 120_000;

import { programs } from '@metaplex/js';

const { metadata: { Metadata } } = programs;

export interface ITx {
    tx: Transaction,
    signers?: Keypair[],
    onTx?: () => Promise<void>,
}

export interface IVTx {
    ixs: TransactionInstruction[];
    signers?: Keypair[];
    onTx?: () => Promise<void>;
}


export async function getPrioFee(url: string, accounts: string[]) {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "jsonrpc": "2.0",
            "id": "1",
            headers: {"Content-Type": "application/json"},
            "method": "getPriorityFeeEstimate",
            "params": [{
                "accountKeys": accounts,
                options: {
                    includeAllPriorityFeeLevels: true,
                }
            }]
        })
    })

    if (!response.ok) {
        throw new Error(`${response.status}`)
    }

    const json = await response.json()

    const feeLevel = json?.result?.priorityFeeLevels?.high


    if (feeLevel === undefined) {
        throw new Error(json)
    }

    const feeNumber = Number(feeLevel)

    if (isNaN(feeNumber)) {
        throw new Error("Invalid fee")
    }

    return feeNumber
}

export async function sendTxs(txs: {
                                  tx: Transaction,
                                  signers?: Keypair[],
                                  onTx?: () => Promise<void>,
                              }[],
                              connection: Connection,
                              prioFeeUrl: string,
                              wallet: Omit<Wallet, "payer">,
                              chunkSize = 20,
                              addPrioFees = false,
                              skipPreflight = false,
                              retryTimeouts = 0, timeout = 120_000) {

    const timeouts: typeof txs = []

    for (let chunk of _.chunk(txs, chunkSize)) {
        if (addPrioFees) {
            for (let subChunk of _.chunk(chunk, 5)) {
                const proms = subChunk.map(async c => {
                    const writables =
                        c.tx.instructions.flatMap(i => i.keys.filter(k => k.isWritable).map(i => i.pubkey))


                    let addedFees = false;
                    try {
                        const prios = Math.floor( await getPrioFee(prioFeeUrl, c.tx.instructions.flatMap(i => i.keys.map(a => a.pubkey.toString()))))

                        const finalFee = Math.min(Math.max(prios || 40000, 40000), 1_300_000)
                        // console.log("Fee adding: " + finalFee)
                        c.tx.instructions.unshift(ComputeBudgetProgram.setComputeUnitPrice({
                            microLamports: finalFee,
                        }))
                        addedFees = true
                    } catch (e) {
                        if (!addedFees) {
                            c.tx.instructions.unshift(ComputeBudgetProgram.setComputeUnitPrice({
                                microLamports: 40000,
                            }))
                        }
                        // console.log(e)
                    }
                })

                await Promise.all(proms)
            }
        }

        const bHash = await connection.getLatestBlockhash("confirmed")

        const signedTxs = await wallet.signAllTransactions(chunk.map(exec => {
            exec.tx.recentBlockhash = bHash.blockhash
            exec.tx.lastValidBlockHeight = bHash.lastValidBlockHeight
            exec.tx.feePayer = wallet.publicKey

            if (exec.signers && exec.signers?.length > 0) {
                exec.tx.partialSign(...exec.signers)
            }

            return exec.tx
        }))

        await parallel(signedTxs.map((tx, index) => {
            return async () => {
                try {
                    await (await sendSignedTransaction({
                        signedTransaction: tx as any,
                        connection,
                        skipPreflight,
                        timeout,
                    })).result
                    // console.log('await done -');

                    await chunk[index].onTx?.()
                    // console.log('await done 2 -');
                } catch (e: any) {
                    // console.log(e)

                    if (e.timeout) {
                        timeouts.push(chunk[index])
                    }
                    else {
                        throw e
                    }
                }
            }
        }))
    }

    if (timeouts.length > 0) {
        if (retryTimeouts > 0) {
            await sendTxs(timeouts, connection, prioFeeUrl, wallet, chunkSize, false, skipPreflight, retryTimeouts - 1)
        }
        else {
            throw new Error("Solana network is to congested to process your TX")
        }
    }
}

export async function sendVTxs(
    txs: {
        ixs: TransactionInstruction[],
        signers?: Keypair[],
        onTx?: () => Promise<void>,
    }[],
    connection: Connection,
    prioFeeUrl: string,
    wallet: Omit<Wallet, "payer">,
    table: AddressLookupTableAccount,
    chunkSize = 20,
    addPrioFees = false,
    skipPreflight = false
): Promise<string[]> {
    const mintIds: string[] = []; // Array to collect mint IDs

    for (let chunk of _.chunk(txs, chunkSize)) {
        if (addPrioFees) {
            for (let subChunk of _.chunk(chunk, 5)) {
                const proms = subChunk.map(async (c) => {
                    let addedFees = false;
                    try {
                        const prios = Math.floor(await getPrioFee(prioFeeUrl, c.ixs.flatMap(i => i.keys.map(a => a.pubkey.toString()))));
                        const finalFee = Math.min(Math.max(prios || 40000, 40000), 1_300_000);
                        // console.log("Fee adding: " + finalFee);
                        c.ixs.unshift(ComputeBudgetProgram.setComputeUnitPrice({
                            microLamports: finalFee,
                        }));
                        addedFees = true;
                    } catch (e) {
                        if (!addedFees) {
                            c.ixs.unshift(ComputeBudgetProgram.setComputeUnitPrice({
                                microLamports: 40000,
                            }));
                        }
                        // console.log(e);
                    }
                });

                await Promise.all(proms); // Ensure fee adjustments are completed
            }
        }

        const bHash = await connection.getLatestBlockhash();

        const signedTxs = await wallet.signAllTransactions(chunk.map(exec => {
            const txMessage = new TransactionMessage({
                instructions: exec.ixs,
                recentBlockhash: bHash.blockhash,
                payerKey: wallet.publicKey,
            }).compileToV0Message([table]);

            const txV0 = new VersionedTransaction(txMessage);

            if (exec.signers && exec.signers.length > 0) {
                txV0.sign(exec.signers);
            }

            return txV0;
        }));

        await new Promise<void>((resolve, reject) => {
            parallel(
                signedTxs.map((tx, index) => {
                    return async () => {
                        try {
                            // console.log('Sending transaction', index, tx);

                            const { result, txid } = await sendSignedTransaction({
                                signedTransaction: tx as any,
                                connection,
                                skipPreflight,
                            });

                            await result; // Wait for transaction confirmation
                            // console.log('Transaction done:', txid);

                            if (chunk[index].onTx) {
                                await chunk[index].onTx?.(); // Execute callback if present
                                // console.log('Callback done for transaction', index);
                            }

                            // Fetch transaction details
                            const transactionDetails = await connection.getTransaction(txid, {
                                commitment: 'confirmed',
                                maxSupportedTransactionVersion: 0
                            });

                            const postTokenBalances = transactionDetails?.meta?.postTokenBalances;
                            if (!postTokenBalances || postTokenBalances.length === 0) {
                                throw new Error('No token balances found in the transaction details.');
                            }

                            const createdNFTMintAddress = postTokenBalances[1]?.mint;
                            if (!createdNFTMintAddress) {
                                throw new Error('Failed to retrieve the NFT mint address.');
                            }

                            // console.log('NFT Mint Address:', createdNFTMintAddress);
                            mintIds.push(createdNFTMintAddress); // Collect mint ID
                            if (index>=signedTxs.length-1) {
                                resolve();
                            }
                        } catch (error) {
                            // console.error('Error in transaction:', error);
                            reject(error); // Reject on error
                        }
                    };
                }),
                (err) => {
                    if (err) {
                        // console.error('Error in parallel execution:', err);
                        reject(err); // Reject on parallel error
                    } else {
                        resolve(); // Resolve when all tasks are done
                    }
                }
            );
        });
    }

    return mintIds; // Return the collected mint IDs
}




export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function sendSignedTransaction({
                                                signedTransaction,
                                                connection,
                                                timeout = DEFAULT_TIMEOUT,
                                                skipPreflight = true,
                                            }: {
    signedTransaction: Transaction;
    connection: Connection;
    timeout?: number;
    skipPreflight?: boolean,
}): Promise<{
    result: Promise<void>,
    txid: string,
}> {
    const rawTransaction = signedTransaction.serialize();

    const startTime = Date.now();
    let slot = 0;
    const txid: TransactionSignature = await connection.sendRawTransaction(
        rawTransaction,
        {
            skipPreflight
        },
    );

    let mintid = "";

    // console.log('Started awaiting confirmation for', txid);

    let done = false;
    (async () => {
        while (!done && Date.now() - startTime < timeout) {
            connection.sendRawTransaction(rawTransaction, {
                skipPreflight: true,
            });
            await sleep(6000);
        }
    })();
    const awaitResp = (async () => {
        try {
            const confirmation = await awaitTransactionSignatureConfirmation(
                txid,
                timeout,
                connection,
                'confirmed',
                true,
            );
            // console.log(confirmation)

            if (!confirmation)
                throw new Error('Timed out awaiting confirmation on transaction');

            if (confirmation.err) {
                // console.error(confirmation.err);
                throw new Error('Transaction failed: Custom instruction error');
            }

            slot = confirmation?.slot || 0;
            
            


                            // Fetch transaction details
                            const transactionDetails = await connection.getTransaction(txid, {
                                commitment: 'confirmed',
                                maxSupportedTransactionVersion: 0
                            });

                            const postTokenBalances = transactionDetails?.meta?.postTokenBalances;
                            if (!postTokenBalances || postTokenBalances.length === 0) {
                                throw new Error('No token balances found in the transaction details.');
                            }

                            const createdNFTMintAddress = postTokenBalances[1]?.mint;
                            if (!createdNFTMintAddress) {
                                throw new Error('Failed to retrieve the NFT mint address.');
                            }

                            // console.log('NFT Mint Address:', createdNFTMintAddress);
            // // Fetch the NFT metadata using the mint address
            // const metadataAccount = await Metadata.getPDA(createdNFTMintAddress);
            // // console.log(metadataAccount);
            // const metadata = await Metadata.load(connection, metadataAccount);

            // // console.log('NFT Metadata:', metadata);
        } catch (err: any) {
            // throw new Error('Transaction failed');
            // console.log(err)
            throw err
            // throw new Error('Transaction failed');
        } finally {
            // console.log('done: true');
            done = true;
        }
    })();


    // console.log('NFT txid:', txid);
    // console.log(awaitResp);
    return {
        txid,
        result: awaitResp,
    };
}


export const awaitTransactionSignatureConfirmation = async (
    txid: TransactionSignature,
    timeout: number,
    connection: Connection,
    commitment: Commitment = "confirmed",
    queryStatus = false
): Promise<SignatureStatus | null | void> => {
    let done = false;
    let status: SignatureStatus | null | void = {
        slot: 0,
        confirmations: 0,
        err: null,
    };
    let subId = 0;
    status = await new Promise(async (resolve, reject) => {
        let timer: any = setTimeout(() => {
            if (done) {
                return;
            }
            done = true;
            // console.log("Rejecting for timeout... " + txid);
            reject({ timeout: true });
        }, timeout);
        try {
            subId = connection.onSignature(
                txid,
                (result: any, context: any) => {
                    done = true;
                    status = {
                        err: result.err,
                        slot: context.slot,
                        confirmations: 0,
                    };
                    if (result.err) {
                        // console.log("Rejected via websocket", result.err);
                        reject(status);
                    } else {
                        // console.log("Resolved via websocket", result);
                        resolve(status);
                    }
                },
                commitment
            );
        } catch (e) {
            done = true;
            // console.error("WS error in setup", txid, e);
        }
        while (!done && queryStatus) {
            // eslint-disable-next-line no-loop-func
            (async () => {
                try {
                    const signatureStatuses = await connection.getSignatureStatuses([
                        txid,
                    ]);
                    status = signatureStatuses && signatureStatuses.value[0];
                    if (!done) {
                        if (!status) {
                            //// console.log("REST null result for", txid, status);
                            if (timer === null) {
                                timer = setTimeout(() => {
                                    if (done) {
                                        return;
                                    }
                                    done = true;
                                    // console.log("Rejecting for timeout... " + txid);
                                    reject({ timeout: true });
                                }, timeout);
                            }
                        } else if (status.err) {
                            // console.log("REST error for", txid, status);
                            done = true;
                            reject(status.err);
                        } else if (!status.confirmations && !status.confirmationStatus) {
                            //// console.log("REST no confirmations for", txid, status);
                        } else {
                            //// console.log("REST confirmation for", txid, status);
                            if (timer !== null) {
                                clearTimeout(timer);
                                timer = null;
                            }
                            if (
                                !status.confirmationStatus ||
                                status.confirmationStatus == commitment
                            ) {
                                done = true;
                                resolve(status);
                            }
                        }
                    }
                } catch (e) {
                    if (!done) {
                        // console.log("REST connection error: txid", txid, e);
                    }
                }
            })();
            await sleep(5000);
        }
    });

    done = true;
    // console.log("Returning status ", status);
    return status;
};