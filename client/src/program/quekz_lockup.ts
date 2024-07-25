/* eslint-disable @typescript-eslint/ban-types */
/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/quekz_lockup.json`.
 */
export type QuekzLockup = {
	'address': 'quekrjyc8AmUPcXRsgyuyBhe8d4ncDKsg8DZJWYjHRt';
	'metadata': {
		'name': 'quekzLockup';
		'version': '0.0.1-alpha';
		'spec': '0.1.0';
		'description': 'Program for migrating from metaplex to WNS';
	};
	'instructions': [
		{
			'name': 'depositQuekz';
			'docs': [
				'deposit quekz',
			];
			'discriminator': [
				222,
				134,
				71,
				102,
				76,
				191,
				72,
				204,
			];
			'accounts': [
				{
					'name': 'owner';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesVault';
					'writable': true;
				},
				{
					'name': 'quekzMember';
				},
				{
					'name': 'quekzMint';
				},
				{
					'name': 'ownerQuekzTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'owner';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'quekzMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'vaultQuekzTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'noblesVault';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'quekzMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'extraMetasAccount';
					'writable': true;
				},
				{
					'name': 'approveAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'distributionAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'tokenProgram';
					'address': 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
				{
					'name': 'distributionProgram';
				},
				{
					'name': 'wnsProgram';
					'address': 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM';
				},
				{
					'name': 'associatedTokenProgram';
					'address': 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
				},
			];
			'args': [];
		},
		{
			'name': 'initializeNobles';
			'docs': [
				'initialize nobles',
			];
			'discriminator': [
				35,
				99,
				120,
				121,
				62,
				70,
				218,
				250,
			];
			'accounts': [
				{
					'name': 'collectionAuthority';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesAuthority';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'wnsGroup';
							},
						];
					};
				},
				{
					'name': 'wnsGroup';
					'writable': true;
				},
				{
					'name': 'wnsGroupMint';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'wnsGroupMintTokenAccount';
					'writable': true;
				},
				{
					'name': 'wnsManager';
				},
				{
					'name': 'rent';
					'address': 'SysvarRent111111111111111111111111111111111';
				},
				{
					'name': 'associatedTokenProgram';
					'address': 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
				},
				{
					'name': 'tokenProgram';
					'address': 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
				{
					'name': 'wnsProgram';
					'address': 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM';
				},
			];
			'args': [
				{
					'name': 'name';
					'type': 'string';
				},
				{
					'name': 'symbol';
					'type': 'string';
				},
				{
					'name': 'uri';
					'type': 'string';
				},
				{
					'name': 'maxSize';
					'type': 'u32';
				},
			];
		},
		{
			'name': 'initializeVault';
			'docs': [
				'initialize vault',
			];
			'discriminator': [
				48,
				191,
				163,
				44,
				71,
				129,
				63,
				164,
			];
			'accounts': [
				{
					'name': 'owner';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesAuthority';
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'wnsGroup';
							},
						];
					};
				},
				{
					'name': 'noblesVault';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'arg';
								'path': 'nonce';
							},
						];
					};
				},
				{
					'name': 'wnsGroup';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
			];
			'args': [
				{
					'name': 'nonce';
					'type': 'pubkey';
				},
			];
		},
		{
			'name': 'lockNoble';
			'docs': [
				'lock noble',
			];
			'discriminator': [
				58,
				214,
				232,
				21,
				201,
				182,
				231,
				229,
			];
			'accounts': [
				{
					'name': 'owner';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesVault';
					'writable': true;
				},
				{
					'name': 'member';
				},
				{
					'name': 'noblesMint';
				},
				{
					'name': 'ownerNobleTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'owner';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'noblesMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'vaultNobleTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'noblesVault';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'noblesMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'extraMetasAccount';
					'writable': true;
				},
				{
					'name': 'approveAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'distributionAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'tokenProgram';
					'address': 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
				{
					'name': 'distributionProgram';
				},
				{
					'name': 'wnsProgram';
					'address': 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM';
				},
				{
					'name': 'associatedTokenProgram';
					'address': 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
				},
			];
			'args': [];
		},
		{
			'name': 'mintNoble';
			'docs': [
				'mint noble',
			];
			'discriminator': [
				34,
				8,
				245,
				192,
				6,
				171,
				166,
				69,
			];
			'accounts': [
				{
					'name': 'owner';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesAuthority';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'wnsGroup';
							},
						];
					};
				},
				{
					'name': 'noblesVault';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'nobles_vault.nonce';
								'account': 'noblesVault';
							},
						];
					};
				},
				{
					'name': 'wnsManager';
				},
				{
					'name': 'wnsGroup';
					'writable': true;
				},
				{
					'name': 'wnsNftMint';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'wnsNftToken';
					'writable': true;
				},
				{
					'name': 'wnsNftMemberAccount';
					'writable': true;
				},
				{
					'name': 'extraMetasAccount';
					'writable': true;
				},
				{
					'name': 'wnsProgram';
					'address': 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
				{
					'name': 'associatedTokenProgram';
					'address': 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
				},
				{
					'name': 'rent';
					'address': 'SysvarRent111111111111111111111111111111111';
				},
				{
					'name': 'tokenProgram';
					'address': 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
				},
			];
			'args': [
				{
					'name': 'name';
					'type': 'string';
				},
				{
					'name': 'symbol';
					'type': 'string';
				},
				{
					'name': 'uri';
					'type': 'string';
				},
			];
		},
		{
			'name': 'unlockNoble';
			'docs': [
				'unlock noble',
			];
			'discriminator': [
				84,
				0,
				234,
				236,
				84,
				204,
				106,
				168,
			];
			'accounts': [
				{
					'name': 'owner';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesVault';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'nobles_vault.nonce';
								'account': 'noblesVault';
							},
						];
					};
				},
				{
					'name': 'member';
				},
				{
					'name': 'noblesMint';
				},
				{
					'name': 'ownerNobleTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'owner';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'noblesMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'vaultNobleTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'noblesVault';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'noblesMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'extraMetasAccount';
					'writable': true;
				},
				{
					'name': 'approveAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'distributionAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'tokenProgram';
					'address': 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
				{
					'name': 'distributionProgram';
				},
				{
					'name': 'wnsProgram';
					'address': 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM';
				},
				{
					'name': 'associatedTokenProgram';
					'address': 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
				},
			];
			'args': [];
		},
		{
			'name': 'updateNoble';
			'docs': [
				'update noble metadata',
			];
			'discriminator': [
				5,
				244,
				235,
				226,
				36,
				174,
				157,
				197,
			];
			'accounts': [
				{
					'name': 'owner';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesAuthority';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'wnsGroup';
							},
						];
					};
				},
				{
					'name': 'wnsNftMint';
					'writable': true;
				},
				{
					'name': 'wnsGroup';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
				{
					'name': 'tokenProgram';
					'address': 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
				},
			];
			'args': [
				{
					'name': 'name';
					'type': 'string';
				},
				{
					'name': 'symbol';
					'type': 'string';
				},
				{
					'name': 'uri';
					'type': 'string';
				},
			];
		},
		{
			'name': 'withdrawQuekz';
			'docs': [
				'withdraw noble',
			];
			'discriminator': [
				5,
				76,
				134,
				214,
				234,
				114,
				152,
				5,
			];
			'accounts': [
				{
					'name': 'owner';
					'writable': true;
					'signer': true;
				},
				{
					'name': 'noblesVault';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'nobles_vault.nonce';
								'account': 'noblesVault';
							},
						];
					};
				},
				{
					'name': 'quekzMember';
				},
				{
					'name': 'quekzMint';
				},
				{
					'name': 'ownerQuekzTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'owner';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'quekzMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'vaultQuekzTa';
					'writable': true;
					'pda': {
						'seeds': [
							{
								'kind': 'account';
								'path': 'noblesVault';
							},
							{
								'kind': 'account';
								'path': 'tokenProgram';
							},
							{
								'kind': 'account';
								'path': 'quekzMint';
							},
						];
						'program': {
							'kind': 'const';
							'value': [
								140,
								151,
								37,
								143,
								78,
								36,
								137,
								241,
								187,
								61,
								16,
								41,
								20,
								142,
								13,
								131,
								11,
								90,
								19,
								153,
								218,
								255,
								16,
								132,
								4,
								142,
								123,
								216,
								219,
								233,
								248,
								89,
							];
						};
					};
				},
				{
					'name': 'extraMetasAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'approveAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'distributionAccount';
					'docs': [
						'CHECKS: cpi checks',
					];
					'writable': true;
				},
				{
					'name': 'tokenProgram';
					'address': 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb';
				},
				{
					'name': 'systemProgram';
					'address': '11111111111111111111111111111111';
				},
				{
					'name': 'distributionProgram';
				},
				{
					'name': 'wnsProgram';
					'address': 'wns1gDLt8fgLcGhWi5MqAqgXpwEP1JftKE9eZnXS1HM';
				},
				{
					'name': 'associatedTokenProgram';
					'address': 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL';
				},
			];
			'args': [];
		},
	];
	'accounts': [
		{
			'name': 'noblesAuthority';
			'discriminator': [
				228,
				65,
				236,
				195,
				26,
				242,
				174,
				150,
			];
		},
		{
			'name': 'noblesVault';
			'discriminator': [
				156,
				244,
				94,
				229,
				170,
				56,
				7,
				179,
			];
		},
		{
			'name': 'tokenGroupMember';
			'discriminator': [
				17,
				208,
				50,
				173,
				30,
				127,
				245,
				94,
			];
		},
	];
	'errors': [
		{
			'code': 6000;
			'name': 'invalidGroupAuthority';
			'msg': 'Invalid Group Authority for collection account';
		},
		{
			'code': 6001;
			'name': 'invalidCreatorPctAmount';
			'msg': 'Invalid creator pct amount. Must add up to 100';
		},
		{
			'code': 6002;
			'name': 'arithmeticOverflow';
			'msg': 'Arithmetic overflow';
		},
	];
	'types': [
		{
			'name': 'noblesAuthority';
			'docs': [
				'empty struct representing nobles collection authority',
			];
			'type': {
				'kind': 'struct';
				'fields': [
					{
						'name': 'authority';
						'type': 'pubkey';
					},
					{
						'name': 'group';
						'type': 'pubkey';
					},
				];
			};
		},
		{
			'name': 'noblesVault';
			'type': {
				'kind': 'struct';
				'fields': [
					{
						'name': 'nonce';
						'docs': [
							'nonce',
						];
						'type': 'pubkey';
					},
					{
						'name': 'owner';
						'docs': [
							'owner is going to be pubkey::default after the nobles is minted since anyone who ones the noble owns the vault',
						];
						'type': 'pubkey';
					},
					{
						'name': 'group';
						'docs': [
							'group account of the nobles',
						];
						'type': 'pubkey';
					},
					{
						'name': 'noblesMint';
						'docs': [
							'nobles mint that is minted when the vault is filled. default is pubkey::default',
						];
						'type': 'pubkey';
					},
					{
						'name': 'quekzDeposited';
						'docs': [
							'number of quekz deposited in the vault',
						];
						'type': 'u8';
					},
					{
						'name': 'isLocked';
						'docs': [
							'nobles is locked',
						];
						'type': 'bool';
					},
				];
			};
		},
		{
			'name': 'tokenGroupMember';
			'docs': [
				'Data struct for a `TokenGroupMember`',
			];
			'type': {
				'kind': 'struct';
				'fields': [
					{
						'name': 'mint';
						'docs': [
							'The associated mint, used to counter spoofing to be sure that member',
							'belongs to a particular mint',
						];
						'type': 'pubkey';
					},
					{
						'name': 'group';
						'docs': [
							'The pubkey of the `TokenGroup`',
						];
						'type': 'pubkey';
					},
					{
						'name': 'memberNumber';
						'docs': [
							'The member number',
						];
						'type': 'u32';
					},
				];
			};
		},
	];
};
