import { Keypair } from '@solana/web3.js';
import 'dotenv/config';
export declare function setupTest(): {
    payer: Keypair;
    authority: Keypair;
    provider: import("@coral-xyz/anchor").AnchorProvider;
    user1: Keypair;
    user2: Keypair;
};
