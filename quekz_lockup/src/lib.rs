//! program to lock up quekz to mint nobles

use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;
pub mod utils;

pub use errors::*;
pub use instructions::*;
pub use state::*;
pub use utils::*;

declare_id!("quekrjyc8AmUPcXRsgyuyBhe8d4ncDKsg8DZJWYjHRt");

#[program]
pub mod quekz_lockup {

    use super::*;

    /// initialize nobles
    pub fn initialize_nobles(
        ctx: Context<InitializeNobles>,
        name: String,
        symbol: String,
        uri: String,
        max_size: u32,
    ) -> Result<()> {
        instructions::nobles::initialize::handler(ctx, name, symbol, uri, max_size)
    }

    /// mint noble
    pub fn mint_noble(
        ctx: Context<MintNoble>,
        name: String,
        symbol: String,
        uri: String,
    ) -> Result<()> {
        instructions::nobles::mint::handler(ctx, name, symbol, uri)
    }

    /// update noble metadata
    pub fn update_noble(
        ctx: Context<UpdateNoble>,
        name: String,
        symbol: String,
        uri: String,
    ) -> Result<()> {
        instructions::nobles::update::handler(ctx, name, symbol, uri)
    }

    /// deposit quekz
    pub fn deposit_quekz(ctx: Context<DepositQuekz>) -> Result<()> {
        instructions::quekz::deposit::handler(ctx)
    }

    /// withdraw noble
    pub fn withdraw_quekz(ctx: Context<WithdrawQuekz>) -> Result<()> {
        instructions::quekz::withdraw::handler(ctx)
    }

    /// initialize vault
    pub fn initialize_vault(ctx: Context<InitializeVault>, nonce: Pubkey) -> Result<()> {
        instructions::vault::initialize::handler(ctx, nonce)
    }

    /// lock noble
    pub fn lock_noble(ctx: Context<LockVault>) -> Result<()> {
        instructions::vault::lock::handler(ctx)
    }

    /// unlock noble
    pub fn unlock_noble(ctx: Context<UnlockVault>) -> Result<()> {
        instructions::vault::unlock::handler(ctx)
    }
}
