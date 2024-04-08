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
exports.getUnlockVault = exports.getLockVault = exports.getInitializeVault = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../utils");
const getInitializeVault = (provider, owner, group) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const nonce = new web3_js_1.Keypair().publicKey;
    const noblesAuthority = (0, utils_1.getNoblesAuthority)(group.toString());
    const ix = yield lockupProgram.methods
        .initializeVault(nonce)
        .accountsStrict({
        noblesAuthority,
        systemProgram: web3_js_1.SystemProgram.programId,
        owner,
        noblesVault: (0, utils_1.getNoblesVault)(nonce.toString()),
    })
        .instruction();
    return ix;
});
exports.getInitializeVault = getInitializeVault;
const getLockVault = (provider, args) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const member = (0, utils_1.getMemberAccountPda)(args.noblesMint);
    const ix = yield lockupProgram.methods
        .unlockNoble()
        .accountsStrict({
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: utils_1.tokenProgramId,
        systemProgram: web3_js_1.SystemProgram.programId,
        owner: args.owner,
        noblesVault: args.noblesVault,
        member,
        noblesMint: args.noblesMint,
        ownerNobleTa: (0, utils_1.getAtaAddress)(args.noblesMint, args.owner),
        vaultNobleTa: (0, utils_1.getAtaAddress)(args.noblesMint, args.noblesVault),
        approveAccount: (0, utils_1.getApproveAccountPda)(args.noblesMint),
        distributionAccount: (0, utils_1.getDistributionAccountPda)(args.noblesMint, args.noblesGroup),
        distributionProgram: utils_1.distributionProgramId,
    })
        .instruction();
    return ix;
});
exports.getLockVault = getLockVault;
const getUnlockVault = (provider, args) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const member = (0, utils_1.getMemberAccountPda)(args.noblesMint);
    const ix = yield lockupProgram.methods
        .unlockNoble()
        .accountsStrict({
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        tokenProgram: utils_1.tokenProgramId,
        systemProgram: web3_js_1.SystemProgram.programId,
        owner: args.owner,
        noblesVault: args.noblesVault,
        member,
        noblesMint: args.noblesMint,
        ownerNobleTa: (0, utils_1.getAtaAddress)(args.noblesMint, args.owner),
        vaultNobleTa: (0, utils_1.getAtaAddress)(args.noblesMint, args.noblesVault),
        approveAccount: (0, utils_1.getApproveAccountPda)(args.noblesMint),
        distributionAccount: (0, utils_1.getDistributionAccountPda)(args.noblesMint, args.noblesGroup),
        distributionProgram: utils_1.distributionProgramId,
    })
        .instruction();
    return ix;
});
exports.getUnlockVault = getUnlockVault;
//# sourceMappingURL=vault.js.map