/// <reference types="@solana/web3.js" />
import { type Provider } from '@coral-xyz/anchor';
export declare const getInitializeVault: (provider: Provider, owner: string, group: string) => Promise<import("@solana/web3.js").TransactionInstruction>;
export type LockOrUnlockVaultArgs = {
    noblesMint: string;
    noblesVault: string;
    owner: string;
    noblesGroup: string;
};
export declare const getLockVault: (provider: Provider, args: LockOrUnlockVaultArgs) => Promise<import("@solana/web3.js").TransactionInstruction>;
export declare const getUnlockVault: (provider: Provider, args: LockOrUnlockVaultArgs) => Promise<import("@solana/web3.js").TransactionInstruction>;
