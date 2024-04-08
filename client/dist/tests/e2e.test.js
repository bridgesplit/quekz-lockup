"use strict";
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
const web3_js_1 = require("@solana/web3.js");
const src_1 = require("../src");
const setup_1 = require("./setup");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('e2e tests', () => {
    const setup = (0, setup_1.setupTest)();
    let groupMint;
    let nftMint;
    (0, vitest_1.test)('setup provider', () => __awaiter(void 0, void 0, void 0, function* () {
        yield setup.provider.connection.confirmTransaction(yield setup.provider.connection.requestAirdrop(setup.payer.publicKey, 1000000000));
        yield setup.provider.connection.confirmTransaction(yield setup.provider.connection.requestAirdrop(setup.authority.publicKey, 1000000000));
        yield setup.provider.connection.confirmTransaction(yield setup.provider.connection.requestAirdrop(setup.user1.publicKey, 1000000000));
        yield setup.provider.connection.confirmTransaction(yield setup.provider.connection.requestAirdrop(setup.user2.publicKey, 1000000000));
    }));
    (0, vitest_1.test)('create group account and distribution account', () => __awaiter(void 0, void 0, void 0, function* () {
        const groupMintKp = new web3_js_1.Keypair();
        groupMint = groupMintKp.publicKey.toString();
        const args = {
            groupMint,
            name: 'test group',
            symbol: 'TST',
            uri: 'https://arweave.net/123',
            maxSize: 2,
            receiver: setup.payer.publicKey.toString(),
            payer: setup.payer.publicKey.toString(),
            authority: setup.authority.publicKey.toString(),
        };
        const createManagerIx = yield (0, src_1.getInitManagerIx)(setup.provider, setup.payer.publicKey.toString());
        const createGroupIx = yield (0, src_1.getCreateGroupIx)(setup.provider, args);
        const addDistributionArgs = {
            groupMint,
            paymentMint: web3_js_1.PublicKey.default.toString(),
            payer: setup.payer.publicKey.toString(),
            authority: setup.authority.publicKey.toString(),
        };
        const addDistributionIx = yield (0, src_1.getAddDistributionIx)(setup.provider, addDistributionArgs);
        const blockhash = yield setup.provider.connection
            .getLatestBlockhash()
            .then(res => res.blockhash);
        const messageV0 = new web3_js_1.TransactionMessage({
            payerKey: setup.payer.publicKey,
            recentBlockhash: blockhash,
            instructions: [createManagerIx, createGroupIx, addDistributionIx],
        }).compileToV0Message();
        const txn = new web3_js_1.VersionedTransaction(messageV0);
        txn.sign([setup.payer, groupMintKp, setup.authority]);
        const txnId = yield setup.provider.connection.sendRawTransaction(txn.serialize());
        yield setup.provider.connection.confirmTransaction(txnId);
        (0, vitest_1.expect)(txnId).toBeTruthy();
        const groupAccount = yield (0, src_1.getGroupAccount)(setup.provider, groupMint);
        (0, vitest_1.expect)(groupAccount === null || groupAccount === void 0 ? void 0 : groupAccount.maxSize).toBe(2);
        (0, vitest_1.expect)(groupAccount === null || groupAccount === void 0 ? void 0 : groupAccount.mint.toString()).toBe(groupMint);
        (0, vitest_1.expect)(groupAccount === null || groupAccount === void 0 ? void 0 : groupAccount.size).toBe(0);
        (0, vitest_1.expect)(groupAccount === null || groupAccount === void 0 ? void 0 : groupAccount.updateAuthority.toString()).toBe(setup.authority.publicKey.toString());
        const distributionAccount = yield (0, src_1.getDistributionAccount)(setup.provider, groupMint, web3_js_1.PublicKey.default.toString());
        (0, vitest_1.expect)(distributionAccount === null || distributionAccount === void 0 ? void 0 : distributionAccount.groupMint.toString()).toBe(groupMint);
        (0, vitest_1.expect)(distributionAccount === null || distributionAccount === void 0 ? void 0 : distributionAccount.paymentMint.toString()).toBe(web3_js_1.PublicKey.default.toString());
    }));
    const royaltyBasisPoints = 500;
    (0, vitest_1.test)('create mint account, add to group and add royalties', () => __awaiter(void 0, void 0, void 0, function* () {
        const nftMintKp = new web3_js_1.Keypair();
        nftMint = nftMintKp.publicKey.toString();
        const args = {
            mint: nftMint,
            name: 'test nft',
            symbol: 'TST',
            uri: 'https://arweave.net/123',
            creators: [
                {
                    address: setup.payer.publicKey.toString(),
                    share: 49,
                },
                {
                    address: setup.authority.publicKey.toString(),
                    share: 51,
                },
            ],
            royaltyBasisPoints,
            receiver: setup.user1.publicKey.toString(),
            payer: setup.payer.publicKey.toString(),
            authority: setup.authority.publicKey.toString(),
        };
        const createIx = yield (0, src_1.getMintNftIx)(setup.provider, args);
        const addArgs = {
            mint: nftMint,
            group: (0, src_1.getGroupAccountPda)(groupMint).toString(),
            payer: setup.payer.publicKey.toString(),
            authority: setup.authority.publicKey.toString(),
        };
        const addIx = yield (0, src_1.getAddNftToGroupIx)(setup.provider, addArgs);
        const addRoyaltiesIx = yield (0, src_1.getAddRoyaltiesIx)(setup.provider, args);
        const blockhash = yield setup.provider.connection
            .getLatestBlockhash()
            .then(res => res.blockhash);
        const messageV0 = new web3_js_1.TransactionMessage({
            payerKey: setup.payer.publicKey,
            recentBlockhash: blockhash,
            instructions: [createIx, addIx, addRoyaltiesIx],
        }).compileToV0Message();
        const txn = new web3_js_1.VersionedTransaction(messageV0);
        txn.sign([setup.payer, nftMintKp, setup.authority]);
        const txnId = yield setup.provider.connection.sendRawTransaction(txn.serialize());
        yield setup.provider.connection.confirmTransaction(txnId);
        (0, vitest_1.expect)(txnId).toBeTruthy();
        const groupAccount = yield (0, src_1.getGroupAccount)(setup.provider, groupMint);
        (0, vitest_1.expect)(groupAccount === null || groupAccount === void 0 ? void 0 : groupAccount.size).toBe(1);
        const groupMemberAccount = yield (0, src_1.getGroupMemberAccount)(setup.provider, nftMint);
        (0, vitest_1.expect)(groupMemberAccount === null || groupMemberAccount === void 0 ? void 0 : groupMemberAccount.mint.toString()).toBe(nftMint);
        (0, vitest_1.expect)(groupMemberAccount === null || groupMemberAccount === void 0 ? void 0 : groupMemberAccount.group.toString()).toBe((0, src_1.getGroupAccountPda)(groupMint).toString());
        (0, vitest_1.expect)(groupMemberAccount === null || groupMemberAccount === void 0 ? void 0 : groupMemberAccount.memberNumber).toBe(1);
    }));
    let buyAmounts = 0;
    let minRentExemption = 0;
    (0, vitest_1.test)('purchase nft from 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const buyAmount = web3_js_1.LAMPORTS_PER_SOL * 15;
        const args = {
            mint: nftMint,
            sender: setup.user1.publicKey.toString(),
            receiver: setup.user2.publicKey.toString(),
            groupMint,
            paymentMint: web3_js_1.PublicKey.default.toString(),
            buyAmount,
            payer: setup.payer.publicKey.toString(),
            authority: setup.user1.publicKey.toString(),
        };
        buyAmounts += buyAmount;
        const ataArgs = {
            mint: nftMint,
            authority: setup.user2.publicKey.toString(),
            payer: setup.payer.publicKey.toString(),
        };
        const ataIx = yield (0, src_1.getAtaCreateIx)(ataArgs);
        const approveIx = yield (0, src_1.getNftTransferApproveIx)(setup.provider, args);
        const ix = yield (0, src_1.getNftTransferIx)(args);
        const txn = new web3_js_1.Transaction().add(ataIx).add(approveIx).add(ix);
        const txnId = yield (0, web3_js_1.sendAndConfirmTransaction)(setup.provider.connection, txn, [setup.payer, setup.user1]);
        (0, vitest_1.expect)(txnId).toBeTruthy();
        minRentExemption = yield setup.provider.connection.getMinimumBalanceForRentExemption(477);
        const distributionAccount = yield (0, src_1.getDistributionAccount)(setup.provider, groupMint, web3_js_1.PublicKey.default.toString());
        (0, vitest_1.expect)(distributionAccount === null || distributionAccount === void 0 ? void 0 : distributionAccount.claimData.map(d => ({ address: d.address.toString(), claimAmount: d.claimAmount.toNumber() })))
            .toStrictEqual([{
                address: setup.payer.publicKey.toString(),
                claimAmount: (buyAmounts * royaltyBasisPoints * 49) / (10000 * 100),
            },
            {
                address: setup.authority.publicKey.toString(),
                claimAmount: (buyAmounts * royaltyBasisPoints * 51) / (10000 * 100),
            }]);
        const distributionBalance = yield setup.provider.connection.getBalance((0, src_1.getDistributionAccountPda)(groupMint, web3_js_1.PublicKey.default.toString()));
        (0, vitest_1.expect)(distributionBalance).toBe(((buyAmounts * royaltyBasisPoints) / 10000) + minRentExemption);
    }));
    (0, vitest_1.test)('purchase nft from 2', () => __awaiter(void 0, void 0, void 0, function* () {
        const buyAmount = web3_js_1.LAMPORTS_PER_SOL * 20;
        const args = {
            mint: nftMint,
            sender: setup.user2.publicKey.toString(),
            receiver: setup.user1.publicKey.toString(),
            groupMint,
            paymentMint: web3_js_1.PublicKey.default.toString(),
            buyAmount,
            payer: setup.payer.publicKey.toString(),
            authority: setup.user2.publicKey.toString(),
        };
        buyAmounts += buyAmount;
        const approveIx = yield (0, src_1.getNftTransferApproveIx)(setup.provider, args);
        const ix = yield (0, src_1.getNftTransferIx)(args);
        const txn = new web3_js_1.Transaction().add(approveIx).add(ix);
        const txnId = yield (0, web3_js_1.sendAndConfirmTransaction)(setup.provider.connection, txn, [setup.payer, setup.user2]);
        (0, vitest_1.expect)(txnId).toBeTruthy();
        const distributionAccount = yield (0, src_1.getDistributionAccount)(setup.provider, groupMint, web3_js_1.PublicKey.default.toString());
        (0, vitest_1.expect)(distributionAccount === null || distributionAccount === void 0 ? void 0 : distributionAccount.claimData.map(d => ({ address: d.address.toString(), claimAmount: d.claimAmount.toNumber() })))
            .toStrictEqual([{
                address: setup.payer.publicKey.toString(),
                claimAmount: ((buyAmounts * royaltyBasisPoints * 49) / (10000 * 100)),
            },
            {
                address: setup.authority.publicKey.toString(),
                claimAmount: ((buyAmounts * royaltyBasisPoints * 51) / (10000 * 100)),
            }]);
        const distributionBalance = yield setup.provider.connection.getBalance((0, src_1.getDistributionAccountPda)(groupMint, web3_js_1.PublicKey.default.toString()));
        (0, vitest_1.expect)(distributionBalance).toBe(((buyAmounts * royaltyBasisPoints) / 10000) + minRentExemption);
    }));
    (0, vitest_1.test)('claim payer royalties', () => __awaiter(void 0, void 0, void 0, function* () {
        const args = {
            group: groupMint,
            creator: setup.payer.publicKey.toString(),
            mintToClaim: web3_js_1.PublicKey.default.toString(),
        };
        const payerBalanceBefore = yield setup.provider.connection.getBalance(setup.payer.publicKey);
        const ix = yield (0, src_1.getClaimDistributionIx)(setup.provider, args);
        const txn = new web3_js_1.Transaction().add(ix);
        txn.feePayer = setup.payer.publicKey;
        txn.recentBlockhash = yield setup.provider.connection.getLatestBlockhash().then(res => res.blockhash);
        const feeEstimation = (yield txn.getEstimatedFee(setup.provider.connection));
        const txnId = yield (0, web3_js_1.sendAndConfirmTransaction)(setup.provider.connection, txn, [setup.payer]);
        (0, vitest_1.expect)(txnId).toBeTruthy();
        const payerBalanceAfter = yield setup.provider.connection.getBalance(setup.payer.publicKey);
        (0, vitest_1.expect)(payerBalanceAfter - payerBalanceBefore).toBe(((buyAmounts * royaltyBasisPoints * 49) / (10000 * 100)) - feeEstimation);
        const distributionAccount = yield (0, src_1.getDistributionAccount)(setup.provider, groupMint, web3_js_1.PublicKey.default.toString());
        (0, vitest_1.expect)(distributionAccount === null || distributionAccount === void 0 ? void 0 : distributionAccount.claimData.map(d => ({ address: d.address.toString(), claimAmount: d.claimAmount.toNumber() })))
            .toStrictEqual([
            {
                address: setup.payer.publicKey.toString(),
                claimAmount: 0,
            },
            {
                address: setup.authority.publicKey.toString(),
                claimAmount: ((buyAmounts * royaltyBasisPoints * 51) / (10000 * 100)),
            },
        ]);
    }));
    (0, vitest_1.test)('claim authority royalties', () => __awaiter(void 0, void 0, void 0, function* () {
        const args = {
            group: groupMint,
            creator: setup.authority.publicKey.toString(),
            mintToClaim: web3_js_1.PublicKey.default.toString(),
        };
        const authorityBalanceBefore = yield setup.provider.connection.getBalance(setup.authority.publicKey);
        const ix = yield (0, src_1.getClaimDistributionIx)(setup.provider, args);
        const txn = new web3_js_1.Transaction().add(ix);
        txn.feePayer = setup.authority.publicKey;
        txn.recentBlockhash = yield setup.provider.connection.getLatestBlockhash().then(res => res.blockhash);
        const feeEstimation = (yield txn.getEstimatedFee(setup.provider.connection));
        const txnId = yield (0, web3_js_1.sendAndConfirmTransaction)(setup.provider.connection, txn, [setup.authority]);
        (0, vitest_1.expect)(txnId).toBeTruthy();
        const authorityBalanceAfter = yield setup.provider.connection.getBalance(setup.authority.publicKey);
        (0, vitest_1.expect)(authorityBalanceAfter - authorityBalanceBefore).toBe(((buyAmounts * royaltyBasisPoints * 51) / (10000 * 100)) - feeEstimation);
        const distributionAccount = yield (0, src_1.getDistributionAccount)(setup.provider, groupMint, web3_js_1.PublicKey.default.toString());
        (0, vitest_1.expect)(distributionAccount === null || distributionAccount === void 0 ? void 0 : distributionAccount.claimData.map(d => ({ address: d.address.toString(), claimAmount: d.claimAmount.toNumber() })))
            .toStrictEqual([
            {
                address: setup.payer.publicKey.toString(),
                claimAmount: 0,
            },
            {
                address: setup.authority.publicKey.toString(),
                claimAmount: 0,
            },
        ]);
    }));
});
//# sourceMappingURL=e2e.test.js.map