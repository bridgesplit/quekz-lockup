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
exports.getMintNobles = exports.getInitializeNobles = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const utils_1 = require("../utils");
const getInitializeNobles = (provider, args) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const { groupNft } = args;
    const group = (0, utils_1.getGroupAccountPda)(groupNft);
    const noblesAuthorityPda = (0, utils_1.getNoblesAuthority)(group.toString());
    const ix = yield lockupProgram.methods
        .initializeNobles(args.name, args.symbol, args.uri, args.maxSize)
        .accountsStrict({
        systemProgram: web3_js_1.SystemProgram.programId,
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        wnsGroupMint: groupNft,
        collectionAuthority: args.collectionAuthority,
        noblesAuthority: noblesAuthorityPda,
        wnsGroup: group,
        wnsGroupMintTokenAccount: (0, utils_1.getAtaAddress)(groupNft, args.collectionAuthority),
        wnsManager: (0, utils_1.getManagerAccountPda)(),
        tokenProgram: utils_1.tokenProgramId,
        wnsProgram: utils_1.wnsProgramId,
    })
        .instruction();
    return ix;
});
exports.getInitializeNobles = getInitializeNobles;
const getMintNobles = (provider, args) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const { nobleMint } = args;
    const member = (0, utils_1.getMemberAccountPda)(nobleMint);
    const noblesAuthorityPda = (0, utils_1.getNoblesAuthority)(args.group.toString());
    const noblesVault = new web3_js_1.PublicKey(args.vault);
    const ix = yield lockupProgram.methods
        .mintNoble(args.name, args.symbol, args.uri)
        .accountsStrict({
        systemProgram: web3_js_1.SystemProgram.programId,
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        noblesAuthority: noblesAuthorityPda,
        wnsGroup: args.group,
        wnsManager: (0, utils_1.getManagerAccountPda)(),
        tokenProgram: utils_1.tokenProgramId,
        wnsProgram: utils_1.wnsProgramId,
        owner: args.owner,
        noblesVault,
        wnsNftMint: nobleMint,
        wnsNftToken: (0, utils_1.getAtaAddress)(nobleMint, args.owner),
        wnsNftMemberAccount: member,
        extraMetasAccount: (0, utils_1.getMemberAccountPda)(nobleMint),
        tokenProgram2022: utils_1.tokenProgramId,
    })
        .instruction();
    return ix;
});
exports.getMintNobles = getMintNobles;
//# sourceMappingURL=nobles.js.map