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
exports.fetchVault = exports.fetchVaultsByUser = void 0;
const core_1 = require("./core");
const fetchVaultsByUser = (provider, userAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, core_1.getLockupProgram)(provider);
    try {
        const vaultAccounts = yield lockupProgram.account.noblesVault.all([
            {
                memcmp: {
                    offset: 8 + 32,
                    bytes: userAddress,
                },
            },
        ]);
        return vaultAccounts;
    }
    catch (e) {
        return undefined;
    }
});
exports.fetchVaultsByUser = fetchVaultsByUser;
const fetchVault = (provider, vaultAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const lockupProgram = (0, core_1.getLockupProgram)(provider);
    try {
        const vaultAccount = yield lockupProgram.account.noblesVault.fetch(vaultAddress);
        return vaultAccount;
    }
    catch (e) {
        return undefined;
    }
});
exports.fetchVault = fetchVault;
//# sourceMappingURL=data.js.map