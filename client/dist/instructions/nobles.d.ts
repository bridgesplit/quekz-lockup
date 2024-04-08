/// <reference types="@solana/web3.js" />
import { type Provider } from '@coral-xyz/anchor';
export type CreateGroupArgs = {
    name: string;
    symbol: string;
    uri: string;
    maxSize: number;
    collectionAuthority: string;
    groupNft: string;
};
export declare const getInitializeNobles: (provider: Provider, args: CreateGroupArgs) => Promise<import("@solana/web3.js").TransactionInstruction>;
export type MintNoblesArgs = {
    name: string;
    symbol: string;
    uri: string;
    owner: string;
    group: string;
    vault: string;
    nobleMint: string;
};
export declare const getMintNobles: (provider: Provider, args: MintNoblesArgs) => Promise<import("@solana/web3.js").TransactionInstruction>;
