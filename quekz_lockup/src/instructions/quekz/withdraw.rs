use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, TokenAccount},
    token_2022::{spl_token_2022, Token2022},
};
use solana_program::pubkey;
use wen_new_standard::{
    cpi::{accounts::ApproveTransfer, approve_transfer},
    get_bump_in_seed_form,
    program::WenNewStandard,
    TokenGroupMember,
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
        constraint = nobles_vault.is_locked || nobles_vault.nobles_mint == Pubkey::default(),
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
    pub quekz_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        associated_token::token_program = token_program,
        associated_token::mint = quekz_mint,
        associated_token::authority = owner,
    )]
    pub owner_quekz_ta: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::token_program = token_program,
        associated_token::mint = quekz_mint,
        associated_token::authority = nobles_vault,
    )]
    pub vault_quekz_ta: Account<'info, TokenAccount>,
    #[account(mut)]
    /// CHECK: cpi checks
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
            authority: self.nobles_vault.to_account_info(),
            mint: self.quekz_mint.to_account_info(),
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

    fn transfer_quekz_to_owner(&self, signer_seeds: &[&[&[u8]]]) -> Result<()> {
        let mut ix = spl_token_2022::instruction::transfer_checked(
            &self.token_program.key.key(),
            &self.vault_quekz_ta.key(),
            &self.quekz_mint.key(),
            &self.owner_quekz_ta.key(),
            &self.nobles_vault.key(),
            &[],
            1, // amount = 1
            0, // 0 decimals
        )?;
        ix.accounts.push(AccountMeta::new_readonly(
            self.extra_metas_account.key(),
            false,
        ));
        ix.accounts
            .push(AccountMeta::new_readonly(self.wns_program.key(), false));
        solana_program::program::invoke_signed(
            &ix,
            &[
                self.vault_quekz_ta.to_account_info(),
                self.quekz_mint.to_account_info(),
                self.owner_quekz_ta.to_account_info(),
                self.nobles_vault.to_account_info(),
            ],
            signer_seeds,
        )
        .map_err(Into::into)
    }
}

pub fn handler(ctx: Context<WithdrawQuekz>) -> Result<()> {
    let signer_seeds = [
        ctx.accounts.nobles_vault.nonce.as_ref(),
        &get_bump_in_seed_form(&ctx.bumps.nobles_vault),
    ];
    ctx.accounts.approve_transfer(&[&signer_seeds[..]])?;
    ctx.accounts.transfer_quekz_to_owner(&[&signer_seeds[..]])?;
    ctx.accounts.nobles_vault.quekz_deposited += 1;
    Ok(())
}
