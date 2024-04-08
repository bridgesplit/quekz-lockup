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
    const groupMint = new web3_js_1.Keypair();
    const group = (0, utils_1.getGroupAccountPda)(groupMint.publicKey.toString());
    const noblesAuthorityPda = (0, utils_1.getNoblesAuthority)(group.toString());
    const ix = yield lockupProgram.methods
        .initializeNobles({
        name: args.name,
        symbol: args.symbol,
        uri: args.uri,
        maxSize: args.maxSize,
    })
        .accountsStrict({
        systemProgram: web3_js_1.SystemProgram.programId,
        rent: web3_js_1.SYSVAR_RENT_PUBKEY,
        associatedTokenProgram: spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID,
        wnsGroupMint: groupMint.publicKey,
        collectionAuthority: args.collectionAuthority,
        noblesAuthority: noblesAuthorityPda,
        wnsGroup: group,
        wnsGroupMintTokenAccount: (0, utils_1.getAtaAddress)(groupMint.publicKey.toString(), args.collectionAuthority),
        wnsManager: (0, utils_1.getManagerAccountPda)(),
        tokenProgram: utils_1.tokenProgramId,
        wnsProgram: utils_1.wnsProgramId,
    })
        .signers([groupMint])
        .instruction();
    return ix;
});
exports.getInitializeNobles = getInitializeNobles;
const getMintNobles = (provider, args) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, utils_1.getLockupProgram)(provider);
    const nftMint = new web3_js_1.Keypair();
    const member = (0, utils_1.getMemberAccountPda)(nftMint.publicKey.toString());
    const noblesAuthorityPda = (0, utils_1.getNoblesAuthority)(args.group.toString());
    const nonce = new web3_js_1.Keypair().publicKey;
    const noblesVault = (0, utils_1.getNoblesVault)(nonce.toString());
    const ix = yield lockupProgram.methods
        .mintNoble({
        name: args.name,
        symbol: args.symbol,
        uri: args.uri,
    })
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
        wnsNftMint: nftMint.publicKey,
        wnsNftToken: (0, utils_1.getAtaAddress)(nftMint.publicKey.toString(), args.owner),
        wnsNftMemberAccount: member,
        extraMetasAccount: (0, utils_1.getMemberAccountPda)(nftMint.publicKey.toString()),
        tokenProgram2022: utils_1.tokenProgramId,
    })
        .signers([nftMint])
        .instruction();
    return ix;
});
exports.getMintNobles = getMintNobles;
//# sourceMappingURL=nobles.js.map