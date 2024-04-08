/// <reference types="@solana/web3.js" />
import { type Provider } from '@coral-xyz/anchor';
export type DepositOrWithdrawQuekzArgs = {
    quekzMint: string;
    owner: string;
    noblesVault: string;
};
export declare const getDepositQuekz: (provider: Provider, args: DepositOrWithdrawQuekzArgs) => Promise<import("@solana/web3.js").TransactionInstruction>;
export declare const getWithdrawQuekz: (provider: Provider, args: DepositOrWithdrawQuekzArgs) => Promise<import("@solana/web3.js").TransactionInstruction>;
