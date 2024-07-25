use anchor_lang::prelude::*;
use anchor_spl::{token_2022::Token2022, token_interface::{spl_token_metadata_interface::state::Field, token_metadata_update_field, Mint, TokenMetadataUpdateField}};
use wen_new_standard::get_bump_in_seed_form;

use crate::NoblesAuthority;

#[derive(Accounts)]
#[instruction()]
pub struct UpdateNoble<'info> {
    #[account(mut)]
    pub owner: Signer<'info>,
    #[account(
        mut,
        seeds = [wns_group.key().as_ref()],
        bump,
    )]
    pub nobles_authority: Account<'info, NoblesAuthority>,
    #[account(mut,
        mint::token_program = token_program,)]
    pub wns_nft_mint: Box<InterfaceAccount<'info, Mint>>,
    /// CHECK: No need to check as authority will be invalid if group is invalid
    pub wns_group: UncheckedAccount<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token2022>,
}

impl<'info> UpdateNoble<'info> {
    fn update_metadata(&self, field: Field, value: String, signer_seeds: &[&[&[u8]]]) -> Result<()> {
        let cpi_accounts = TokenMetadataUpdateField {
            token_program_id: self.token_program.to_account_info(),
            metadata: self.wns_nft_mint.to_account_info(), // metadata account is the mint, since data is stored in mint
            update_authority: self.nobles_authority.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(self.token_program.to_account_info(), cpi_accounts, signer_seeds);
        token_metadata_update_field(cpi_ctx, field, value)?;
        Ok(())
    }
}

pub fn handler(ctx: Context<UpdateNoble>, name: String, symbol: String, uri: String) -> Result<()> {
    let wns_group = ctx.accounts.wns_group.key();
    let signer_seeds = [
        wns_group.as_ref(),
        &get_bump_in_seed_form(&ctx.bumps.nobles_authority),
    ];

    if name != "" {
        // update metadata name
        ctx.accounts.update_metadata(Field::Name, name, &[&signer_seeds[..]])?;
    }

    if symbol != "" {
        // update metadata symbol
        ctx.accounts.update_metadata(Field::Symbol, symbol, &[&signer_seeds[..]])?;
    }


    if uri != "" {
        // update metadata uri
        ctx.accounts.update_metadata(Field::Uri, uri, &[&signer_seeds[..]])?;
    }

    Ok(())
}
