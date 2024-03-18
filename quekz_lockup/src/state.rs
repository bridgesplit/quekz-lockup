use anchor_lang::prelude::*;
use solana_program::pubkey;

pub const QUEKZ_GROUP: Pubkey = pubkey!("dqci6TGXWGTki8DTQ1QcJ3qg4fPbxUzj6MwJBGjuhHX");

#[account()]
/// empty struct representing nobles collection authority
pub struct NoblesAuthority {
    pub authority: Pubkey,
    pub group: Pubkey,
}

pub const QUEKZ_DEPOSIT_LIMIT: u8 = 10;

#[account()]
pub struct NoblesVault {
    /// nonce
    pub nonce: Pubkey,
    /// owner is going to be pubkey::default after the nobles is minted since anyone who ones the noble owns the vault
    pub owner: Pubkey,
    /// group account of the nobles
    pub group: Pubkey,
    /// nobles mint that is minted when the vault is filled. default is pubkey::default
    pub nobles_mint: Pubkey,
    /// number of quekz deposited in the vault
    pub quekz_deposited: u8,
    /// nobles is locked
    pub is_locked: bool,
}
