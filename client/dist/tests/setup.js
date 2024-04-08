"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTest = void 0;
const web3_js_1 = require("@solana/web3.js");
const src_1 = require("../src");
require("dotenv/config");
function setupTest() {
    const payer = web3_js_1.Keypair.generate();
    const authority = web3_js_1.Keypair.generate();
    const provider = (0, src_1.getProvider)();
    const user1 = web3_js_1.Keypair.generate();
    const user2 = web3_js_1.Keypair.generate();
    return {
        payer,
        authority,
        provider,
        user1,
        user2,
    };
}
exports.setupTest = setupTest;
//# sourceMappingURL=setup.js.map