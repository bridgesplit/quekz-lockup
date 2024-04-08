use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, TokenAccount},
    token_2022::{Token2022, TransferChecked},
};
use solana_program::pubkey;
use wen_new_standard::{
    cpi::{accounts::ApproveTransfer, approve_transfer},
    program::WenNewStandard,
    TokenGroupMember,
};

use crate::{wns_transfer_checked, NoblesVault, QUEKZ_DEPOSIT_LIMIT};

#[derive(Accounts)]
#[instruction()]
pub struct LockVault<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        constraint = !nobles_vault.is_locked,
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
    #[account(
        mint::token_program = token_program,
    )]
    pub nobles_mint: Box<Account<'info, Mint>>,
    #[account(
        mut,
        associated_token::mint = token_program,
        associated_token::authority = owner,
    )]
    pub owner_noble_ta: Account<'info, TokenAccount>,
    #[account(
        init_if_needed,
        payer = owner,
        associated_token::mint = token_program,
        associated_token::authority = owner,
    )]
    pub vault_noble_ta: Account<'info, TokenAccount>,
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

impl LockVault<'_> {
    fn approve_transfer(&self) -> Result<()> {
        let cpi_program = self.wns_program.to_account_info();
        let cpi_accounts = ApproveTransfer {
            payer: self.owner.to_account_info(),
            authority: self.owner.to_account_info(),
            mint: self.nobles_mint.to_account_info(),
            approve_account: self.approve_account.to_account_info(),
            payment_mint: self.system_program.to_account_info(), //  wont be used
            distribution_token_account: self.nobles_vault.to_account_info(), // wont be used
            authority_token_account: self.owner.to_account_info(), // wont be used
            distribution_account: self.distribution_account.to_account_info(),
            system_program: self.system_program.to_account_info(),
            distribution_program: self.distribution_program.to_account_info(),
            token_program: self.token_program.to_account_info(),
            associated_token_program: self.associated_token_program.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        approve_transfer(cpi_ctx, 0)
    }

    fn transfer_nft_to_vault(&self) -> Result<()> {
        let transfer_cpi = CpiContext::new(
            self.token_program.to_account_info(),
            TransferChecked {
                from: self.owner_noble_ta.to_account_info(),
                to: self.vault_noble_ta.to_account_info(),
                authority: self.owner.to_account_info(),
                mint: self.nobles_mint.to_account_info(),
            },
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

pub fn handler(ctx: Context<LockVault>) -> Result<()> {
    ctx.accounts.approve_transfer()?;
    ctx.accounts.transfer_nft_to_vault()?;
    ctx.accounts.nobles_vault.is_locked = true;
    Ok(())
}
