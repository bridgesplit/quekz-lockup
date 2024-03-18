import {ASSOCIATED_TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {Keypair, SYSVAR_RENT_PUBKEY, SystemProgram} from '@solana/web3.js';
import {type Provider} from '@coral-xyz/anchor';
import {
	getAtaAddress, getGroupAccountPda, getLockupProgram, getManagerAccountPda, getMemberAccountPda, getNoblesAuthority,
	getNoblesVault,
	tokenProgramId,
	wnsProgramId,
} from '../utils';

export type CreateGroupArgs = {
	name: string;
	symbol: string;
	uri: string;
	maxSize: number;
	collectionAuthority: string;
};

export const getInitializeNobles = async (provider: Provider, args: CreateGroupArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const groupMint = new Keypair();
	const group = getGroupAccountPda(groupMint.publicKey.toString());
	const noblesAuthorityPda = getNoblesAuthority(group.toString());
	const ix = await lockupProgram.methods
		.initializeNobles({
			name: args.name,
			symbol: args.symbol,
			uri: args.uri,
			maxSize: args.maxSize,
		})
		.accountsStrict({
			systemProgram: SystemProgram.programId,
			rent: SYSVAR_RENT_PUBKEY,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			wnsGroupMint: groupMint.publicKey,
			collectionAuthority: args.collectionAuthority,
			noblesAuthority: noblesAuthorityPda,
			wnsGroup: group,
			wnsGroupMintTokenAccount: getAtaAddress(groupMint.publicKey.toString(), args.collectionAuthority),
			wnsManager: getManagerAccountPda(),
			tokenProgram: tokenProgramId,
			wnsProgram: wnsProgramId,
		})
		.signers([groupMint])
		.instruction();
	return ix;
};

export type MintNoblesArgs = {
	name: string;
	symbol: string;
	uri: string;
	owner: string;
	group: string;
};

export const getMintNobles = async (provider: Provider, args: MintNoblesArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const nftMint = new Keypair();
	const member = getMemberAccountPda(nftMint.publicKey.toString());
	const noblesAuthorityPda = getNoblesAuthority(args.group.toString());
	const nonce = new Keypair().publicKey;
	const noblesVault = getNoblesVault(nonce.toString());
	const ix = await lockupProgram.methods
		.mintNoble({
			name: args.name,
			symbol: args.symbol,
			uri: args.uri,
		})
		.accountsStrict({
			systemProgram: SystemProgram.programId,
			rent: SYSVAR_RENT_PUBKEY,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			noblesAuthority: noblesAuthorityPda,
			wnsGroup: args.group,
			wnsManager: getManagerAccountPda(),
			tokenProgram: tokenProgramId,
			wnsProgram: wnsProgramId,
			owner: args.owner,
			noblesVault,
			wnsNftMint: nftMint.publicKey,
			wnsNftToken: getAtaAddress(nftMint.publicKey.toString(), args.owner),
			wnsNftMemberAccount: member,
			extraMetasAccount: getMemberAccountPda(nftMint.publicKey.toString()),
			tokenProgram2022: tokenProgramId,
		})
		.signers([nftMint])
		.instruction();
	return ix;
};
