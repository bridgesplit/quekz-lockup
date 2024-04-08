import {ASSOCIATED_TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
	Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram,
} from '@solana/web3.js';
import {type Provider} from '@coral-xyz/anchor';
import {
	getAtaAddress, getGroupAccountPda, getLockupProgram, getManagerAccountPda, getMemberAccountPda, getNoblesAuthority,
	tokenProgramId,
	wnsProgramId,
} from '../utils';

export type CreateGroupArgs = {
	name: string;
	symbol: string;
	uri: string;
	maxSize: number;
	collectionAuthority: string;
	groupNft: string;
};

export const getInitializeNobles = async (provider: Provider, args: CreateGroupArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const {groupNft} = args;
	const group = getGroupAccountPda(groupNft);
	const noblesAuthorityPda = getNoblesAuthority(group.toString());
	const ix = await lockupProgram.methods
		.initializeNobles(
			args.name,
			args.symbol,
			args.uri,
			args.maxSize,
		)
		.accountsStrict({
			systemProgram: SystemProgram.programId,
			rent: SYSVAR_RENT_PUBKEY,
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			wnsGroupMint: groupNft,
			collectionAuthority: args.collectionAuthority,
			noblesAuthority: noblesAuthorityPda,
			wnsGroup: group,
			wnsGroupMintTokenAccount: getAtaAddress(groupNft, args.collectionAuthority),
			wnsManager: getManagerAccountPda(),
			tokenProgram: tokenProgramId,
			wnsProgram: wnsProgramId,
		})
		.instruction();
	return ix;
};

export type MintNoblesArgs = {
	name: string;
	symbol: string;
	uri: string;
	owner: string;
	group: string;
	vault: string;
	nobleMint: string;
};

export const getMintNobles = async (provider: Provider, args: MintNoblesArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const {nobleMint} = args;
	const member = getMemberAccountPda(nobleMint);
	const noblesAuthorityPda = getNoblesAuthority(args.group.toString());
	const noblesVault = new PublicKey(args.vault);
	const ix = await lockupProgram.methods
		.mintNoble(args.name, args.symbol, args.uri)
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
			wnsNftMint: nobleMint,
			wnsNftToken: getAtaAddress(nobleMint, args.owner),
			wnsNftMemberAccount: member,
			extraMetasAccount: getMemberAccountPda(nobleMint),
			tokenProgram2022: tokenProgramId,
		})
		.instruction();
	return ix;
};
