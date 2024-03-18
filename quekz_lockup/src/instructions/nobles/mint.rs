use anchor_lang::prelude::*;
use anchor_spl::{associated_token::AssociatedToken, token::Token, token_2022::Token2022};
use wen_new_standard::{
    cpi::{
        accounts::{AddGroup, AddRoyalties, CreateMintAccount},
        add_mint_to_group, add_royalties, create_mint_account,
    },
    program::WenNewStandard,
    CreateMintAccountArgs, CreatorWithShare, UpdateRoyaltiesArgs,
};

use crate::{NoblesAuthority, NoblesVault, QUEKZ_DEPOSIT_LIMIT};

#[derive(Accounts)]
#[instruction()]
pub struct MintNoble<'info> {
    pub owner: Signer<'info>,
    #[account(
        constraint = nobles_authority.group == wns_group.key(),
    )]
    pub nobles_authority: Account<'info, NoblesAuthority>,
    #[account(
        mut,
        seeds = [nobles_vault.nonce.as_ref()],
        bump,
        constraint = nobles_vault.group == wns_group.key(),
        constraint = nobles_vault.quekz_deposited == QUEKZ_DEPOSIT_LIMIT,
        constraint = nobles_vault.owner == owner.key(),
    )]
    pub nobles_vault: Account<'info, NoblesVault>,
    /// CHECK: cpi checks
    pub wns_manager: UncheckedAccount<'info>,
    /// CHECK: cpi checks
    pub wns_group: UncheckedAccount<'info>,
    /// CHECK: cpi checks
    pub wns_nft_mint: UncheckedAccount<'info>,
    /// CHECK: cpi checkss
    pub wns_nft_token: UncheckedAccount<'info>,
    /// CHECK: cpi checks
    pub wns_nft_member_account: UncheckedAccount<'info>,
    /// CHECK: cpi checks
    pub extra_metas_account: UncheckedAccount<'info>,
    pub wns_program: Program<'info, WenNewStandard>,
    pub system_program: Program<'info, System>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
    pub token_program_2022: Program<'info, Token2022>,
}

impl<'info> MintNoble<'info> {
    fn mint_wns_nft(&self, args: CreateMintAccountArgs) -> Result<()> {
        let cpi_accounts = CreateMintAccount {
            payer: self.owner.to_account_info(),
            authority: self.nobles_authority.to_account_info(),
            receiver: self.owner.to_account_info(),
            mint: self.wns_nft_mint.to_account_info(),
            mint_token_account: self.wns_nft_token.to_account_info(),
            manager: self.wns_manager.to_account_info(),
            system_program: self.system_program.to_account_info(),
            rent: self.rent.to_account_info(),
            associated_token_program: self.associated_token_program.to_account_info(),
            token_program: self.token_program.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(self.wns_program.to_account_info(), cpi_accounts);
        create_mint_account(cpi_ctx, args)?;
        Ok(())
    }

    fn add_wns_nft_member(&self) -> Result<()> {
        let cpi_accounts = AddGroup {
            payer: self.owner.to_account_info(),
            group: self.wns_group.to_account_info(),
            manager: self.wns_manager.to_account_info(),
            authority: self.nobles_authority.to_account_info(),
            mint: self.wns_nft_mint.to_account_info(),
            member: self.wns_nft_member_account.to_account_info(),
            token_program: self.token_program.to_account_info(),
            system_program: self.system_program.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(self.wns_program.to_account_info(), cpi_accounts);
        add_mint_to_group(cpi_ctx)?;
        Ok(())
    }

    fn add_wns_royalties(&self, args: UpdateRoyaltiesArgs) -> Result<()> {
        let cpi_accounts = AddRoyalties {
            payer: self.owner.to_account_info(),
            authority: self.nobles_authority.to_account_info(),
            mint: self.wns_nft_mint.to_account_info(),
            extra_metas_account: self.extra_metas_account.to_account_info(),
            system_program: self.system_program.to_account_info(),
            token_program: self.token_program_2022.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(self.token_program.to_account_info(), cpi_accounts);
        add_royalties(cpi_ctx, args)?;
        Ok(())
    }
}

pub fn handler(ctx: Context<MintNoble>, args: CreateMintAccountArgs) -> Result<()> {
    // create wns nft
    ctx.accounts.mint_wns_nft(args)?;

    // add wns nft to group
    ctx.accounts.add_wns_nft_member()?;

    // add wns nft royalties
    ctx.accounts.add_wns_royalties(UpdateRoyaltiesArgs {
        royalty_basis_points: 500,
        creators: vec![CreatorWithShare {
            address: Pubkey::default(),
            share: 100,
        }],
    })?;

    ctx.accounts.nobles_vault.owner = Pubkey::default();
    ctx.accounts.nobles_vault.nobles_mint = ctx.accounts.wns_nft_mint.key();

    Ok(())
}
