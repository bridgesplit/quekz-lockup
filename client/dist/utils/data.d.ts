import { type AnchorProvider } from '@coral-xyz/anchor';
export declare const fetchVaultsByUser: (provider: AnchorProvider, userAddress: string) => Promise<import("@coral-xyz/anchor").ProgramAccount<never>[] | undefined>;
export declare const fetchVault: (provider: AnchorProvider, vaultAddress: string) => Promise<undefined>;
