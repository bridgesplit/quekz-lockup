use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token_2022::TransferChecked,
    token_interface::{
        Mint, Token2022, TokenAccount,
    }
};
use crate::wns_transfer_checked;
use solana_program::pubkey;
use wen_new_standard::{
    cpi::{accounts::ApproveTransfer, approve_transfer},
    program::WenNewStandard,
    get_bump_in_seed_form, TokenGroupMember,
};

use crate::{NoblesVault, QUEKZ_GROUP};

#[derive(Accounts)]
#[instruction()]
pub struct WithdrawQuekz<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [nobles_vault.nonce.as_ref()],
        bump,
        constraint = nobles_vault.is_locked,
        constraint = nobles_vault.owner == owner.key() || nobles_vault.nobles_mint != Pubkey::default(),
    )]
    pub nobles_vault: Box<Account<'info, NoblesVault>>,
    #[account(
        owner = wen_new_standard::ID,
        constraint = quekz_member.group == QUEKZ_GROUP,
        constraint = quekz_member.mint == quekz_mint.key(),
    )]
    pub quekz_member: Account<'info, TokenGroupMember>,
    #[account(
        mint::token_program = token_program,
    )]
    pub quekz_mint: Box<InterfaceAccount<'info, Mint>>,
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::token_program = token_program,
        associated_token::mint = quekz_mint,
        associated_token::authority = owner,
    )]
    pub owner_quekz_ta: Box<InterfaceAccount<'info, TokenAccount>>,
    #[account(
        mut,
        associated_token::token_program = token_program,
        associated_token::mint = quekz_mint,
        associated_token::authority = nobles_vault,
    )]
    pub vault_quekz_ta: Box<InterfaceAccount<'info, TokenAccount>>,
    /// CHECKS: cpi checks
    #[account(mut)]
    pub extra_metas_account: UncheckedAccount<'info>,
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

impl WithdrawQuekz<'_> {
    fn approve_transfer(&self, signer_seeds: &[&[&[u8]]]) -> Result<()> {
        let cpi_program = self.wns_program.to_account_info();
        let cpi_accounts = ApproveTransfer {
            payer: self.owner.to_account_info(),
            authority: self.owner.to_account_info(),
            mint: self.quekz_mint.to_account_info(),
            approve_account: self.approve_account.to_account_info(),
            payment_mint: self.system_program.to_account_info(), //  wont be used
            distribution_token_account: None, // wont be used
            authority_token_account: None, // wont be used
            distribution_account: self.distribution_account.to_account_info(),
            system_program: self.system_program.to_account_info(),
            distribution_program: self.distribution_program.to_account_info(),
            token_program: self.token_program.to_account_info(),
            payment_token_program: None,
        };
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, signer_seeds);
        approve_transfer(cpi_ctx, 0)
    }
    fn transfer_quekz_to_owner(&self, signer_seeds: &[&[&[u8]]]) -> Result<()> {
        let transfer_cpi = CpiContext::new_with_signer(
            self.token_program.to_account_info(),
            TransferChecked {
                from: self.vault_quekz_ta.to_account_info(),
                to: self.owner_quekz_ta.to_account_info(),
                authority: self.nobles_vault.to_account_info(),
                mint: self.quekz_mint.to_account_info(),
            }, signer_seeds
        );

        wns_transfer_checked(
            transfer_cpi.with_remaining_accounts(vec![
                self.wns_program.to_account_info(),
                self.extra_metas_account.to_account_info(),
                self.approve_account.to_account_info(),
            ]),
            1, // supply = 1
            0, // decimals = 0
        )
    }
}

pub fn handler(ctx: Context<WithdrawQuekz>) -> Result<()> {
    let signer_seeds = [
        ctx.accounts.nobles_vault.nonce.as_ref(),
        &get_bump_in_seed_form(&ctx.bumps.nobles_vault),
    ];
    ctx.accounts.approve_transfer(&[&signer_seeds[..]])?;
    ctx.accounts
        .transfer_quekz_to_owner(&[&signer_seeds[..]])?;
    ctx.accounts.nobles_vault.quekz_deposited -= 1;
    Ok(())
}
