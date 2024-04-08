"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithdrawQuekz = exports.getDepositQuekz = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../utils");
const getDepositQuekz = (provider, args) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const quekzMember = (0, utils_1.getMemberAccountPda)(args.quekzMint);
    const extraMetasAccount = (0, utils_1.getExtraMetasAccountPda)(args.quekzMint);
    const ix = yield lockupProgram.methods
        .depositQuekz()
        .accountsStrict({
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: utils_1.tokenProgramId,
        systemProgram: web3_js_1.SystemProgram.programId,
        owner: args.owner,
        noblesVault: args.noblesVault,
        quekzMember,
        extraMetasAccount,
        quekzMint: args.quekzMint,
        ownerQuekzTa: (0, utils_1.getAtaAddress)(args.quekzMint, args.owner),
        vaultQuekzTa: (0, utils_1.getAtaAddress)(args.quekzMint, args.noblesVault),
        approveAccount: (0, utils_1.getApproveAccountPda)(args.quekzMint),
        distributionAccount: (0, utils_1.getDistributionAccountPda)(utils_1.quekzGroupMint.toString(), web3_js_1.PublicKey.default.toString()),
        distributionProgram: utils_1.distributionProgramId,
        wnsProgram: utils_1.wnsProgramId,
    })
        .instruction();
    return ix;
});
exports.getDepositQuekz = getDepositQuekz;
const getWithdrawQuekz = (provider, args) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const quekzMember = (0, utils_1.getMemberAccountPda)(args.quekzMint);
    const ix = yield lockupProgram.methods
        .withdrawQuekz()
        .accountsStrict({
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: utils_1.tokenProgramId,
        systemProgram: web3_js_1.SystemProgram.programId,
        owner: args.owner,
        noblesVault: args.noblesVault,
        quekzMember,
        quekzMint: args.quekzMint,
        ownerQuekzTa: (0, utils_1.getAtaAddress)(args.quekzMint, args.owner),
        vaultQuekzTa: (0, utils_1.getAtaAddress)(args.quekzMint, args.noblesVault),
        approveAccount: (0, utils_1.getApproveAccountPda)(args.quekzMint),
        distributionAccount: (0, utils_1.getDistributionAccountPda)(args.quekzMint, utils_1.quekzGroupMint.toString()),
        distributionProgram: utils_1.distributionProgramId,
        wnsProgram: utils_1.wnsProgramId,
    })
        .instruction();
    return ix;
});
exports.getWithdrawQuekz = getWithdrawQuekz;
//# sourceMappingURL=quekz.js.map