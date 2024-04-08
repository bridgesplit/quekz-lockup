"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDistributionAccountPda = exports.getApproveAccountPda = exports.getExtraMetasAccountPda = exports.getMemberAccountPda = exports.getManagerAccountPda = exports.getNoblesVault = exports.getNoblesAuthority = exports.getAtaAddress = exports.getGroupAccountPda = exports.getProgramAddress = exports.getLockupProgram = exports.getProvider = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const web3_js_1 = require("@solana/web3.js");
const constants_1 = require("./constants");
const spl_token_1 = require("@solana/spl-token");
const program_1 = require("../program");
const getProvider = () => {
    var _a;
    const connection = new web3_js_1.Connection((_a = process.env.RPC_URL) !== null && _a !== void 0 ? _a : 'https://api.devnet.solana.com');
    const anchorProvider = anchor_1.AnchorProvider.local();
    const provider = new anchor_1.AnchorProvider(connection, anchorProvider.wallet, Object.assign(Object.assign({}, anchor_1.AnchorProvider.defaultOptions()), { commitment: 'processed' }));
    return provider;
};
exports.getProvider = getProvider;
const getLockupProgram = (provider) => new anchor_1.Program(program_1.quekzLockupIdl, constants_1.wnsProgramId, provider);
exports.getLockupProgram = getLockupProgram;
const getProgramAddress = (seeds, programId) => {
    const [key] = web3_js_1.PublicKey.findProgramAddressSync(seeds, programId);
    return key;
};
exports.getProgramAddress = getProgramAddress;
const getGroupAccountPda = (mint) => {
    const [groupAccount] = web3_js_1.PublicKey.findProgramAddressSync([anchor_1.utils.bytes.utf8.encode('group'), new web3_js_1.PublicKey(mint).toBuffer()], constants_1.wnsProgramId);
    return groupAccount;
};
exports.getGroupAccountPda = getGroupAccountPda;
const getAtaAddress = (mint, owner) => (0, exports.getProgramAddress)([new web3_js_1.PublicKey(owner).toBuffer(), constants_1.tokenProgramId.toBuffer(), new web3_js_1.PublicKey(mint).toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
exports.getAtaAddress = getAtaAddress;
const getNoblesAuthority = (group) => {
    const [noblesAuthority] = web3_js_1.PublicKey.findProgramAddressSync([new web3_js_1.PublicKey(group).toBuffer()], constants_1.lockupProgramId);
    return noblesAuthority;
};
exports.getNoblesAuthority = getNoblesAuthority;
const getNoblesVault = (nonce) => {
    const [noblesAuthority] = web3_js_1.PublicKey.findProgramAddressSync([new web3_js_1.PublicKey(nonce).toBuffer()], constants_1.lockupProgramId);
    return noblesAuthority;
};
exports.getNoblesVault = getNoblesVault;
const getManagerAccountPda = () => {
    const [managerAccount] = web3_js_1.PublicKey.findProgramAddressSync([anchor_1.utils.bytes.utf8.encode('manager')], constants_1.wnsProgramId);
    return managerAccount;
};
exports.getManagerAccountPda = getManagerAccountPda;
const getMemberAccountPda = (mint) => {
    const [groupAccount] = web3_js_1.PublicKey.findProgramAddressSync([anchor_1.utils.bytes.utf8.encode('member'), new web3_js_1.PublicKey(mint).toBuffer()], constants_1.wnsProgramId);
    return groupAccount;
};
exports.getMemberAccountPda = getMemberAccountPda;
const getExtraMetasAccountPda = (mint) => {
    const [extraMetasAccount] = web3_js_1.PublicKey.findProgramAddressSync([anchor_1.utils.bytes.utf8.encode('extra-account-metas'), new web3_js_1.PublicKey(mint).toBuffer()], constants_1.wnsProgramId);
    return extraMetasAccount;
};
exports.getExtraMetasAccountPda = getExtraMetasAccountPda;
const getApproveAccountPda = (mint) => {
    const [approveAccount] = web3_js_1.PublicKey.findProgramAddressSync([anchor_1.utils.bytes.utf8.encode('approve-account'), new web3_js_1.PublicKey(mint).toBuffer()], constants_1.wnsProgramId);
    return approveAccount;
};
exports.getApproveAccountPda = getApproveAccountPda;
const getDistributionAccountPda = (groupMint, paymentMint) => {
    const [distributionAccount] = web3_js_1.PublicKey.findProgramAddressSync([new web3_js_1.PublicKey(groupMint).toBuffer(), new web3_js_1.PublicKey(paymentMint).toBuffer()], constants_1.distributionProgramId);
    return distributionAccount;
};
exports.getDistributionAccountPda = getDistributionAccountPda;
//# sourceMappingURL=core.js.map