import {type AnchorProvider} from '@coral-xyz/anchor';
import {getLockupProgram} from './core';
import {noblesGroup} from './constants';

export const fetchVaultsByUser = async (provider: AnchorProvider, userAddress: string) => {
	const lockupProgram = getLockupProgram(provider);

	try {
		const vaultAccounts = await lockupProgram.account.noblesVault.all(
			[
				{
					memcmp: {
						offset: 8 + 32,
						bytes: userAddress,
					},
				},
				{
					memcmp: {
						offset: 8 + 32 + 32,
						bytes: noblesGroup.toString(),
					},
				},
			],
		);

		return vaultAccounts;
	} catch (e) {
		return undefined;
	}
};

export const fetchVault = async (provider: AnchorProvider, vaultAddress: string) => {
	const lockupProgram = getLockupProgram(provider);

	try {
		const vaultAccount = await lockupProgram.account.noblesVault.fetch(vaultAddress);

		return vaultAccount;
	} catch (e) {
		return undefined;
	}
};
