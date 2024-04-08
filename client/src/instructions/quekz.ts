import {ASSOCIATED_TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {
	Keypair, PublicKey, SYSVAR_RENT_PUBKEY, SystemProgram,
} from '@solana/web3.js';
import {type Provider} from '@coral-xyz/anchor';
import {
	distributionProgramId,
	getApproveAccountPda,
	getAtaAddress, getDistributionAccountPda, getExtraMetasAccountPda, getGroupAccountPda, getLockupProgram, getManagerAccountPda, getMemberAccountPda, getNoblesAuthority,
	quekzGroupMint,
	tokenProgramId,
	wnsProgramId,
} from '../utils';

export type DepositOrWithdrawQuekzArgs = {
	quekzMint: string;
	owner: string;
	noblesVault: string;
};

export const getDepositQuekz = async (provider: Provider, args: DepositOrWithdrawQuekzArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const quekzMember = getMemberAccountPda(args.quekzMint);
	const extraMetasAccount = getExtraMetasAccountPda(args.quekzMint);
	const ix = await lockupProgram.methods
		.depositQuekz()
		.accountsStrict({
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			tokenProgram: tokenProgramId,
			systemProgram: SystemProgram.programId,
			owner: args.owner,
			noblesVault: args.noblesVault,
			quekzMember,
			extraMetasAccount,
			quekzMint: args.quekzMint,
			ownerQuekzTa: getAtaAddress(args.quekzMint, args.owner),
			vaultQuekzTa: getAtaAddress(args.quekzMint, args.noblesVault),
			approveAccount: getApproveAccountPda(args.quekzMint),
			distributionAccount: getDistributionAccountPda(quekzGroupMint.toString(), PublicKey.default.toString()),
			distributionProgram: distributionProgramId,
			wnsProgram: wnsProgramId,
		})
		.instruction();
	return ix;
};

export const getWithdrawQuekz = async (provider: Provider, args: DepositOrWithdrawQuekzArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const quekzMember = getMemberAccountPda(args.quekzMint);
	const ix = await lockupProgram.methods
		.withdrawQuekz()
		.accountsStrict({
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			tokenProgram: tokenProgramId,
			systemProgram: SystemProgram.programId,
			owner: args.owner,
			noblesVault: args.noblesVault,
			quekzMember,
			quekzMint: args.quekzMint,
			ownerQuekzTa: getAtaAddress(args.quekzMint, args.owner),
			vaultQuekzTa: getAtaAddress(args.quekzMint, args.noblesVault),
			approveAccount: getApproveAccountPda(args.quekzMint),
			distributionAccount: getDistributionAccountPda(args.quekzMint, quekzGroupMint.toString()),
			distributionProgram: distributionProgramId,
			wnsProgram: wnsProgramId,
		})
		.instruction();
	return ix;
};
