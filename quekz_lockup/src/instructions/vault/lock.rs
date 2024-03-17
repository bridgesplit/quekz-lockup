use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, TokenAccount},
    token_2022::{transfer_checked, Token2022, TransferChecked},
};
use wen_new_standard::TokenGroupMember;

use crate::{NoblesVault, QUEKZ_DEPOSIT_LIMIT};

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
    pub token_program: Program<'info, Token2022>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
}

impl LockVault<'_> {
    fn transfer_nft_to_vault(&self, amount: u64) -> Result<()> {
        let cpi_program = self.token_program.to_account_info();
        let cpi_accounts = TransferChecked {
            from: self.owner_noble_ta.to_account_info(),
            mint: self.nobles_mint.to_account_info(),
            to: self.vault_noble_ta.to_account_info(),
            authority: self.owner.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        transfer_checked(cpi_ctx, amount, self.nobles_mint.decimals)
    }
}

pub fn handler(ctx: Context<LockVault>) -> Result<()> {
    ctx.accounts.transfer_nft_to_vault(1)?;
    ctx.accounts.nobles_vault.is_locked = true;
    Ok(())
}
