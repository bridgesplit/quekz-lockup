"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IDL = void 0;
exports.IDL = {
    "version": "0.0.1-alpha",
    "name": "quekz_lockup",
    "instructions": [
        {
            "name": "initializeNobles",
            "docs": [
                "initialize nobles"
            ],
            "accounts": [
                {
                    "name": "collectionAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "noblesAuthority",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "wnsGroup",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "wnsGroupMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "wnsGroupMintTokenAccount",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "wnsManager",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "wnsProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "args",
                    "type": {
                        "defined": "wen_new_standard::CreateGroupAccountArgs"
                    }
                }
            ]
        },
        {
            "name": "mintNoble",
            "docs": [
                "mint noble"
            ],
            "accounts": [
                {
                    "name": "owner",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "noblesAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "noblesVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "wnsManager",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "wnsGroup",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "wnsNftMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "wnsNftToken",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "wnsNftMemberAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "extraMetasAccount",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "wnsProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram2022",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "args",
                    "type": {
                        "defined": "wen_new_standard::CreateMintAccountArgs"
                    }
                }
            ]
        },
        {
            "name": "depositQuekz",
            "docs": [
                "deposit quekz"
            ],
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "noblesVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quekzMember",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "quekzMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "ownerQuekzTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "vaultQuekzTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "approveAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "distributionAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "distributionProgram",
                    "isMut": false,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "withdrawQuekz",
            "docs": [
                "withdraw noble"
            ],
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "noblesVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quekzMember",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "quekzMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "ownerQuekzTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "vaultQuekzTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "approveAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "distributionAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "distributionProgram",
                    "isMut": false,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "initializeVault",
            "docs": [
                "initialize vault"
            ],
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "noblesAuthority",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "noblesVault",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "nonce",
                    "type": "publicKey"
                }
            ]
        },
        {
            "name": "lockNoble",
            "docs": [
                "lock noble"
            ],
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "noblesVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "member",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "noblesMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "ownerNobleTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "vaultNobleTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "approveAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "distributionAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "distributionProgram",
                    "isMut": false,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        },
        {
            "name": "unlockNoble",
            "docs": [
                "unlock noble"
            ],
            "accounts": [
                {
                    "name": "owner",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "noblesVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "member",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "noblesMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "ownerNobleTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "vaultNobleTa",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "approveAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "distributionAccount",
                    "isMut": true,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "distributionProgram",
                    "isMut": false,
                    "isSigner": false,
                    "docs": [
                        "CHECKS: cpi checks"
                    ]
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": []
        }
    ],
    "accounts": [
        {
            "name": "noblesAuthority",
            "docs": [
                "empty struct representing nobles collection authority"
            ],
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "authority",
                        "type": "publicKey"
                    },
                    {
                        "name": "group",
                        "type": "publicKey"
                    }
                ]
            }
        },
        {
            "name": "noblesVault",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "nonce",
                        "docs": [
                            "nonce"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "owner",
                        "docs": [
                            "owner is going to be pubkey::default after the nobles is minted since anyone who ones the noble owns the vault"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "group",
                        "docs": [
                            "group account of the nobles"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "noblesMint",
                        "docs": [
                            "nobles mint that is minted when the vault is filled. default is pubkey::default"
                        ],
                        "type": "publicKey"
                    },
                    {
                        "name": "quekzDeposited",
                        "docs": [
                            "number of quekz deposited in the vault"
                        ],
                        "type": "u8"
                    },
                    {
                        "name": "isLocked",
                        "docs": [
                            "nobles is locked"
                        ],
                        "type": "bool"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "InvalidGroupAuthority",
            "msg": "Invalid Group Authority for collection account"
        },
        {
            "code": 6001,
            "name": "InvalidCreatorPctAmount",
            "msg": "Invalid creator pct amount. Must add up to 100"
        },
        {
            "code": 6002,
            "name": "ArithmeticOverflow",
            "msg": "Arithmetic overflow"
        }
    ]
};
//# sourceMappingURL=quekz_lockup.js.map