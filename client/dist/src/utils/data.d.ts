/// <reference types="@solana/web3.js" />
import { type AnchorProvider } from '@coral-xyz/anchor';
export declare const fetchVaultsByUser: (provider: AnchorProvider, userAddress: string) => Promise<import("@coral-xyz/anchor").ProgramAccount<{
    nonce: import("@solana/web3.js").PublicKey;
    owner: import("@solana/web3.js").PublicKey;
    group: import("@solana/web3.js").PublicKey;
    noblesMint: import("@solana/web3.js").PublicKey;
    quekzDeposited: number;
    isLocked: boolean;
}>[] | undefined>;
export declare const fetchVault: (provider: AnchorProvider, vaultAddress: string) => Promise<{
    nonce: import("@solana/web3.js").PublicKey;
    owner: import("@solana/web3.js").PublicKey;
    group: import("@solana/web3.js").PublicKey;
    noblesMint: import("@solana/web3.js").PublicKey;
    quekzDeposited: number;
    isLocked: boolean;
} | undefined>;
