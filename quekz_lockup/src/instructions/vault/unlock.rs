use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, TokenAccount},
    token_2022::{transfer_checked, Token2022, TransferChecked},
};
use wen_new_standard::{get_bump_in_seed_form, TokenGroupMember};

use crate::{NoblesVault, QUEKZ_DEPOSIT_LIMIT};

#[derive(Accounts)]
#[instruction()]
pub struct UnlockVault<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [nobles_vault.nonce.as_ref()],
        bump,
        constraint = nobles_vault.is_locked,
        constraint = nobles_vault.quekz_deposited == QUEKZ_DEPOSIT_LIMIT,
        constraint = nobles_vault.nobles_mint == nobles_mint.key(),
    )]
    pub nobles_vault: Box<Account<'info, NoblesVault>>,
    #[account(
        owner = wen_new_standard::ID,
        constraint = member.group == nobles_vault.group,
        constraint = member.mint == nobles_mint.key(),
    )]
    pub member: Account<'info, TokenGroupMember>,
    #[account()]
    pub nobles_mint: Box<Account<'info, Mint>>,
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = nobles_mint,
        associated_token::authority = owner,
    )]
    pub owner_noble_ta: Account<'info, TokenAccount>,
    #[account(
        mut,
        associated_token::mint = nobles_mint,
        associated_token::authority = nobles_vault,
    )]
    pub vault_noble_ta: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token2022>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl UnlockVault<'_> {
    fn transfer_nft_to_owner(&self, amount: u64, signer_seeds: &[&[&[u8]]]) -> Result<()> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_accounts = TransferChecked {
            from: self.vault_noble_ta.to_account_info(),
            mint: self.nobles_mint.to_account_info(),
            to: self.owner_noble_ta.to_account_info(),
            authority: self.nobles_vault.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        transfer_checked(cpi_ctx, amount, self.nobles_mint.decimals)
    }
}

pub fn handler(ctx: Context<UnlockVault>) -> Result<()> {
    let signer_seeds = [
        ctx.accounts.nobles_vault.nonce.as_ref(),
        &get_bump_in_seed_form(&ctx.bumps.nobles_vault),
    ];
    ctx.accounts
        .transfer_nft_to_owner(1, &[&signer_seeds[..]])?;
    ctx.accounts.nobles_vault.is_locked = true;
    Ok(())
}
