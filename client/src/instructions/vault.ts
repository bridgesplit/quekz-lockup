import {ASSOCIATED_TOKEN_PROGRAM_ID} from '@solana/spl-token';
import {Keypair, SystemProgram} from '@solana/web3.js';
import {type Provider} from '@coral-xyz/anchor';
import {
	distributionProgramId,
	getApproveAccountPda,
	getAtaAddress, getDistributionAccountPda, getLockupProgram, getMemberAccountPda, getNoblesAuthority,
	getNoblesVault,
	tokenProgramId,
	wnsProgramId,
} from '../utils';

export const getInitializeVault = async (provider: Provider, owner: string, group: string) => {
	const lockupProgram = getLockupProgram(provider);
	const nonce = new Keypair().publicKey;
	const noblesAuthority = getNoblesAuthority(group.toString());
	const ix = await lockupProgram.methods
		.initializeVault(nonce)
		.accountsStrict({
			noblesAuthority,
			systemProgram: SystemProgram.programId,
			owner,
			wnsGroup: group,
			noblesVault: getNoblesVault(nonce.toString()),
		})
		.instruction();
	return ix;
};

export type LockOrUnlockVaultArgs = {
	noblesMint: string;
	noblesVault: string;
	owner: string;
	noblesGroup: string;
};

export const getLockVault = async (provider: Provider, args: LockOrUnlockVaultArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const member = getMemberAccountPda(args.noblesMint);
	const ix = await lockupProgram.methods
		.unlockNoble()
		.accountsStrict({
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			tokenProgram: tokenProgramId,
			systemProgram: SystemProgram.programId,
			owner: args.owner,
			noblesVault: args.noblesVault,
			member,
			noblesMint: args.noblesMint,
			ownerNobleTa: getAtaAddress(args.noblesMint, args.owner),
			vaultNobleTa: getAtaAddress(args.noblesMint, args.noblesVault),
			approveAccount: getApproveAccountPda(args.noblesMint),
			distributionAccount: getDistributionAccountPda(args.noblesMint, args.noblesGroup),
			distributionProgram: distributionProgramId,
			wnsProgram: wnsProgramId,
		})
		.instruction();
	return ix;
};

export const getUnlockVault = async (provider: Provider, args: LockOrUnlockVaultArgs) => {
	const lockupProgram = getLockupProgram(provider);
	const member = getMemberAccountPda(args.noblesMint);
	const ix = await lockupProgram.methods
		.unlockNoble()
		.accountsStrict({
			associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
			tokenProgram: tokenProgramId,
			systemProgram: SystemProgram.programId,
			owner: args.owner,
			noblesVault: args.noblesVault,
			member,
			noblesMint: args.noblesMint,
			ownerNobleTa: getAtaAddress(args.noblesMint, args.owner),
			vaultNobleTa: getAtaAddress(args.noblesMint, args.noblesVault),
			approveAccount: getApproveAccountPda(args.noblesMint),
			distributionAccount: getDistributionAccountPda(args.noblesMint, args.noblesGroup),
			distributionProgram: distributionProgramId,
			wnsProgram: wnsProgramId,
		})
		.instruction();
	return ix;
};
