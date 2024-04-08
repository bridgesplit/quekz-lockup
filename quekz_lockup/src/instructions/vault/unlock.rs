use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, TokenAccount},
    token_2022::{transfer_checked, Token2022, TransferChecked},
};
use solana_program::pubkey;
use wen_new_standard::{
    cpi::{accounts::ApproveTransfer, approve_transfer},
    get_bump_in_seed_form,
    program::WenNewStandard,
    TokenGroupMember,
};

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
    /// CHECKS: cpi checks
    #[account(mut)]
    pub approve_account: UncheckedAccount<'info>,
    /// CHECKS: cpi checks
    #[account(mut)]
    pub distribution_account: UncheckedAccount<'info>,
    pub token_program: Program<'info, Token2022>,
    pub system_program: Program<'info, System>,
    #[account(
        executable,
        constraint = distribution_program.key() == pubkey!("diste3nXmK7ddDTs1zb6uday6j4etCa9RChD8fJ1xay")
    )]
    /// CHECK: Constraint check on key
    pub distribution_program: UncheckedAccount<'info>,
    pub wns_program: Program<'info, WenNewStandard>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl UnlockVault<'_> {
    fn approve_transfer(&self, signer_seeds: &[&[&[u8]]]) -> Result<()> {
        let cpi_program = self.wns_program.to_account_info();
        let cpi_accounts = ApproveTransfer {
            payer: self.owner.to_account_info(),
            authority: self.nobles_vault.to_account_info(),
            mint: self.nobles_mint.to_account_info(),
            approve_account: self.approve_account.to_account_info(),
            payment_mint: self.system_program.to_account_info(), //  wont be used
            distribution_token_account: self.owner.to_account_info(), // wont be used
            authority_token_account: self.nobles_vault.to_account_info(), // wont be used
            distribution_account: self.distribution_account.to_account_info(),
            system_program: self.system_program.to_account_info(),
            distribution_program: self.distribution_program.to_account_info(),
            token_program: self.token_program.to_account_info(),
            associated_token_program: self.associated_token_program.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        approve_transfer(cpi_ctx, 0)
    }
    fn transfer_nft_to_owner(&self, signer_seeds: &[&[&[u8]]]) -> Result<()> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_accounts = TransferChecked {
            from: self.vault_noble_ta.to_account_info(),
            mint: self.nobles_mint.to_account_info(),
            to: self.owner_noble_ta.to_account_info(),
            authority: self.nobles_vault.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        transfer_checked(cpi_ctx, 1, 0)
    }
}

pub fn handler(ctx: Context<UnlockVault>) -> Result<()> {
    let signer_seeds = [
        ctx.accounts.nobles_vault.nonce.as_ref(),
        &get_bump_in_seed_form(&ctx.bumps.nobles_vault),
    ];
    ctx.accounts.approve_transfer(&[&signer_seeds[..]])?;
    ctx.accounts.transfer_nft_to_owner(&[&signer_seeds[..]])?;
    ctx.accounts.nobles_vault.is_locked = true;
    Ok(())
}
