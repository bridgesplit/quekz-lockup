use anchor_lang::prelude::*;

use crate::{NoblesAuthority, NoblesVault};

#[derive(Accounts)]
#[instruction(nonce: Pubkey)]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account()]
    pub nobles_authority: Account<'info, NoblesAuthority>,
    #[account(
        init,
        space = 8,
        payer = owner,
        signer,
        seeds = [nonce.as_ref()],
        bump,
    )]
    pub nobles_vault: Box<Account<'info, NoblesVault>>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeVault>, nonce: Pubkey) -> Result<()> {
    ctx.accounts.nobles_vault.owner = ctx.accounts.owner.key();
    ctx.accounts.nobles_vault.nobles_mint = Pubkey::default();
    ctx.accounts.nobles_vault.quekz_deposited = 0;
    ctx.accounts.nobles_vault.is_locked = false;
    ctx.accounts.nobles_vault.nonce = nonce;
    ctx.accounts.nobles_vault.group = ctx.accounts.nobles_authority.group;
    Ok(())
}
