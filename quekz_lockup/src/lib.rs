//! program to lock up quekz to mint nobles

use anchor_lang::prelude::*;

pub mod errors;
pub mod instructions;
pub mod state;

pub use errors::*;
pub use instructions::*;
pub use state::*;

declare_id!("diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay");

#[program]
pub mod quekz_lockup {

    use super::*;

    /// initialize nobles
    pub fn initialize_nobles(
        ctx: Context<InitializeNobles>,
        args: wen_new_standard::CreateGroupAccountArgs,
    ) -> Result<()> {
        instructions::nobles::initialize::handler(ctx, args)
    }

    /// mint noble
    pub fn mint_noble(
        ctx: Context<MintNoble>,
        args: wen_new_standard::CreateMintAccountArgs,
    ) -> Result<()> {
        instructions::nobles::mint::handler(ctx, args)
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
