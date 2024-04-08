use anchor_lang::prelude::*;

use crate::{NoblesAuthority, NoblesVault};

#[derive(Accounts)]
#[instruction(nonce: Pubkey)]
pub struct InitializeVault<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        seeds = [wns_group.key().as_ref()],
        bump,
    )]
    pub nobles_authority: Account<'info, NoblesAuthority>,
    #[account(
        init,
        space = 8 + NoblesVault::INIT_SPACE,
        payer = owner,
        seeds = [nonce.as_ref()],
        bump,
    )]
    pub nobles_vault: Box<Account<'info, NoblesVault>>,
    /// CHECK: cpi checks
    pub wns_group: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
}

pub fn handler(ctx: Context<InitializeVault>, nonce: Pubkey) -> Result<()> {
    let nobles_vault = &mut ctx.accounts.nobles_vault;

    nobles_vault.owner = ctx.accounts.owner.key();
    nobles_vault.nobles_mint = Pubkey::default();
    nobles_vault.quekz_deposited = 0;
    nobles_vault.is_locked = false;
    nobles_vault.nonce = nonce;
    nobles_vault.group = ctx.accounts.nobles_authority.group;
    Ok(())
}
