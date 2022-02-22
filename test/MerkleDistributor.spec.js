"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importStar(require("chai"));
var ethereum_waffle_1 = require("ethereum-waffle");
var ethers_1 = require("ethers");
var balance_tree_1 = __importDefault(require("../src/balance-tree"));
var MerkleDistributor_json_1 = __importDefault(require("../build/MerkleDistributor.json"));
var TestERC20_json_1 = __importDefault(require("../build/TestERC20.json"));
var parse_balance_map_1 = require("../src/parse-balance-map");
chai_1.default.use(ethereum_waffle_1.solidity);
var overrides = {
    gasLimit: 9999999,
};
var ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';
describe('MerkleDistributor', function () {
    var provider = new ethereum_waffle_1.MockProvider({
        ganacheOptions: {
            hardfork: 'istanbul',
            mnemonic: 'horn horn horn horn horn horn horn horn horn horn horn horn',
            gasLimit: 9999999,
        },
    });
    var wallets = provider.getWallets();
    var wallet0 = wallets[0], wallet1 = wallets[1];
    var token;
    beforeEach('deploy token', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, TestERC20_json_1.default, ['Token', 'TKN', 0], overrides)];
                case 1:
                    token = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe('#token', function () {
        it('returns the token address', function () { return __awaiter(void 0, void 0, void 0, function () {
            var distributor, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, ZERO_BYTES32], overrides)];
                    case 1:
                        distributor = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, distributor.token()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(token.address);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#merkleRoot', function () {
        it('returns the zero merkle root', function () { return __awaiter(void 0, void 0, void 0, function () {
            var distributor, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, ZERO_BYTES32], overrides)];
                    case 1:
                        distributor = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, distributor.merkleRoot()];
                    case 2:
                        _a.apply(void 0, [_b.sent()]).to.eq(ZERO_BYTES32);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('#claim', function () {
        it('fails for empty proof', function () { return __awaiter(void 0, void 0, void 0, function () {
            var distributor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, ZERO_BYTES32], overrides)];
                    case 1:
                        distributor = _a.sent();
                        return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(0, wallet0.address, 10, [])).to.be.revertedWith('MerkleDistributor: Invalid proof.')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('fails for invalid index', function () { return __awaiter(void 0, void 0, void 0, function () {
            var distributor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, ZERO_BYTES32], overrides)];
                    case 1:
                        distributor = _a.sent();
                        return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(0, wallet0.address, 10, [])).to.be.revertedWith('MerkleDistributor: Invalid proof.')];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        describe('two account tree', function () {
            var distributor;
            var tree;
            beforeEach('deploy', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tree = new balance_tree_1.default([
                                { account: wallet0.address, amount: ethers_1.BigNumber.from(100) },
                                { account: wallet1.address, amount: ethers_1.BigNumber.from(101) },
                            ]);
                            return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, tree.getHexRoot()], overrides)];
                        case 1:
                            distributor = _a.sent();
                            return [4 /*yield*/, token.setBalance(distributor.address, 201)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('successful claim', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof0, proof1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof0 = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(0, wallet0.address, 100, proof0, overrides))
                                    .to.emit(distributor, 'Claimed')
                                    .withArgs(0, wallet0.address, 100)];
                        case 1:
                            _a.sent();
                            proof1 = tree.getProof(1, wallet1.address, ethers_1.BigNumber.from(101));
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(1, wallet1.address, 101, proof1, overrides))
                                    .to.emit(distributor, 'Claimed')
                                    .withArgs(1, wallet1.address, 101)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('transfers the token', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof0, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            proof0 = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            _a = chai_1.expect;
                            return [4 /*yield*/, token.balanceOf(wallet0.address)];
                        case 1:
                            _a.apply(void 0, [_c.sent()]).to.eq(0);
                            return [4 /*yield*/, distributor.claim(0, wallet0.address, 100, proof0, overrides)];
                        case 2:
                            _c.sent();
                            _b = chai_1.expect;
                            return [4 /*yield*/, token.balanceOf(wallet0.address)];
                        case 3:
                            _b.apply(void 0, [_c.sent()]).to.eq(100);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('must have enough to transfer', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof0;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof0 = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, token.setBalance(distributor.address, 99)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(0, wallet0.address, 100, proof0, overrides)).to.be.revertedWith('ERC20: transfer amount exceeds balance')];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('sets #isClaimed', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof0, _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            proof0 = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            _a = chai_1.expect;
                            return [4 /*yield*/, distributor.isClaimed(0)];
                        case 1:
                            _a.apply(void 0, [_e.sent()]).to.eq(false);
                            _b = chai_1.expect;
                            return [4 /*yield*/, distributor.isClaimed(1)];
                        case 2:
                            _b.apply(void 0, [_e.sent()]).to.eq(false);
                            return [4 /*yield*/, distributor.claim(0, wallet0.address, 100, proof0, overrides)];
                        case 3:
                            _e.sent();
                            _c = chai_1.expect;
                            return [4 /*yield*/, distributor.isClaimed(0)];
                        case 4:
                            _c.apply(void 0, [_e.sent()]).to.eq(true);
                            _d = chai_1.expect;
                            return [4 /*yield*/, distributor.isClaimed(1)];
                        case 5:
                            _d.apply(void 0, [_e.sent()]).to.eq(false);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('cannot allow two claims', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof0;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof0 = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, distributor.claim(0, wallet0.address, 100, proof0, overrides)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(0, wallet0.address, 100, proof0, overrides)).to.be.revertedWith('MerkleDistributor: Drop already claimed.')];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('cannot claim more than once: 0 and then 1', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, distributor.claim(0, wallet0.address, 100, tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100)), overrides)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, distributor.claim(1, wallet1.address, 101, tree.getProof(1, wallet1.address, ethers_1.BigNumber.from(101)), overrides)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(0, wallet0.address, 100, tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100)), overrides)).to.be.revertedWith('MerkleDistributor: Drop already claimed.')];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('cannot claim more than once: 1 and then 0', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, distributor.claim(1, wallet1.address, 101, tree.getProof(1, wallet1.address, ethers_1.BigNumber.from(101)), overrides)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, distributor.claim(0, wallet0.address, 100, tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100)), overrides)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(1, wallet1.address, 101, tree.getProof(1, wallet1.address, ethers_1.BigNumber.from(101)), overrides)).to.be.revertedWith('MerkleDistributor: Drop already claimed.')];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('cannot claim for address other than proof', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof0;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof0 = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(1, wallet1.address, 101, proof0, overrides)).to.be.revertedWith('MerkleDistributor: Invalid proof.')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('cannot claim more than proof', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof0;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof0 = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(0, wallet0.address, 101, proof0, overrides)).to.be.revertedWith('MerkleDistributor: Invalid proof.')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('gas', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof, tx, receipt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof = tree.getProof(0, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, distributor.claim(0, wallet0.address, 100, proof, overrides)];
                        case 1:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.wait()];
                        case 2:
                            receipt = _a.sent();
                            (0, chai_1.expect)(receipt.gasUsed).to.eq(78466);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('larger tree', function () {
            var distributor;
            var tree;
            beforeEach('deploy', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tree = new balance_tree_1.default(wallets.map(function (wallet, ix) {
                                return { account: wallet.address, amount: ethers_1.BigNumber.from(ix + 1) };
                            }));
                            return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, tree.getHexRoot()], overrides)];
                        case 1:
                            distributor = _a.sent();
                            return [4 /*yield*/, token.setBalance(distributor.address, 201)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('claim index 4', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof = tree.getProof(4, wallets[4].address, ethers_1.BigNumber.from(5));
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(4, wallets[4].address, 5, proof, overrides))
                                    .to.emit(distributor, 'Claimed')
                                    .withArgs(4, wallets[4].address, 5)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('claim index 9', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof = tree.getProof(9, wallets[9].address, ethers_1.BigNumber.from(10));
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(9, wallets[9].address, 10, proof, overrides))
                                    .to.emit(distributor, 'Claimed')
                                    .withArgs(9, wallets[9].address, 10)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('gas', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof, tx, receipt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof = tree.getProof(9, wallets[9].address, ethers_1.BigNumber.from(10));
                            return [4 /*yield*/, distributor.claim(9, wallets[9].address, 10, proof, overrides)];
                        case 1:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.wait()];
                        case 2:
                            receipt = _a.sent();
                            (0, chai_1.expect)(receipt.gasUsed).to.eq(80960);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('gas second down about 15k', function () { return __awaiter(void 0, void 0, void 0, function () {
                var tx, receipt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, distributor.claim(0, wallets[0].address, 1, tree.getProof(0, wallets[0].address, ethers_1.BigNumber.from(1)), overrides)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, distributor.claim(1, wallets[1].address, 2, tree.getProof(1, wallets[1].address, ethers_1.BigNumber.from(2)), overrides)];
                        case 2:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.wait()];
                        case 3:
                            receipt = _a.sent();
                            (0, chai_1.expect)(receipt.gasUsed).to.eq(65940);
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        describe('realistic size tree', function () {
            var distributor;
            var tree;
            var NUM_LEAVES = 100000;
            var NUM_SAMPLES = 25;
            var elements = [];
            for (var i = 0; i < NUM_LEAVES; i++) {
                var node = { account: wallet0.address, amount: ethers_1.BigNumber.from(100) };
                elements.push(node);
            }
            tree = new balance_tree_1.default(elements);
            it('proof verification works', function () {
                var root = Buffer.from(tree.getHexRoot().slice(2), 'hex');
                for (var i = 0; i < NUM_LEAVES; i += NUM_LEAVES / NUM_SAMPLES) {
                    var proof = tree
                        .getProof(i, wallet0.address, ethers_1.BigNumber.from(100))
                        .map(function (el) { return Buffer.from(el.slice(2), 'hex'); });
                    var validProof = balance_tree_1.default.verifyProof(i, wallet0.address, ethers_1.BigNumber.from(100), proof, root);
                    (0, chai_1.expect)(validProof).to.be.true;
                }
            });
            beforeEach('deploy', function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, tree.getHexRoot()], overrides)];
                        case 1:
                            distributor = _a.sent();
                            return [4 /*yield*/, token.setBalance(distributor.address, ethers_1.constants.MaxUint256)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            it('gas', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof, tx, receipt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof = tree.getProof(50000, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, distributor.claim(50000, wallet0.address, 100, proof, overrides)];
                        case 1:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.wait()];
                        case 2:
                            receipt = _a.sent();
                            (0, chai_1.expect)(receipt.gasUsed).to.eq(91650);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('gas deeper node', function () { return __awaiter(void 0, void 0, void 0, function () {
                var proof, tx, receipt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proof = tree.getProof(90000, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, distributor.claim(90000, wallet0.address, 100, proof, overrides)];
                        case 1:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.wait()];
                        case 2:
                            receipt = _a.sent();
                            (0, chai_1.expect)(receipt.gasUsed).to.eq(91586);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('gas average random distribution', function () { return __awaiter(void 0, void 0, void 0, function () {
                var total, count, i, proof, tx, receipt, average;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            total = ethers_1.BigNumber.from(0);
                            count = 0;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < NUM_LEAVES)) return [3 /*break*/, 5];
                            proof = tree.getProof(i, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, distributor.claim(i, wallet0.address, 100, proof, overrides)];
                        case 2:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.wait()];
                        case 3:
                            receipt = _a.sent();
                            total = total.add(receipt.gasUsed);
                            count++;
                            _a.label = 4;
                        case 4:
                            i += NUM_LEAVES / NUM_SAMPLES;
                            return [3 /*break*/, 1];
                        case 5:
                            average = total.div(count);
                            (0, chai_1.expect)(average).to.eq(77075);
                            return [2 /*return*/];
                    }
                });
            }); });
            // this is what we gas golfed by packing the bitmap
            it('gas average first 25', function () { return __awaiter(void 0, void 0, void 0, function () {
                var total, count, i, proof, tx, receipt, average;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            total = ethers_1.BigNumber.from(0);
                            count = 0;
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 25)) return [3 /*break*/, 5];
                            proof = tree.getProof(i, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, distributor.claim(i, wallet0.address, 100, proof, overrides)];
                        case 2:
                            tx = _a.sent();
                            return [4 /*yield*/, tx.wait()];
                        case 3:
                            receipt = _a.sent();
                            total = total.add(receipt.gasUsed);
                            count++;
                            _a.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 1];
                        case 5:
                            average = total.div(count);
                            (0, chai_1.expect)(average).to.eq(62824);
                            return [2 /*return*/];
                    }
                });
            }); });
            it('no double claims in random distribution', function () { return __awaiter(void 0, void 0, void 0, function () {
                var i, proof;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            i = 0;
                            _a.label = 1;
                        case 1:
                            if (!(i < 25)) return [3 /*break*/, 5];
                            proof = tree.getProof(i, wallet0.address, ethers_1.BigNumber.from(100));
                            return [4 /*yield*/, distributor.claim(i, wallet0.address, 100, proof, overrides)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(i, wallet0.address, 100, proof, overrides)).to.be.revertedWith('MerkleDistributor: Drop already claimed.')];
                        case 3:
                            _a.sent();
                            _a.label = 4;
                        case 4:
                            i += Math.floor(Math.random() * (NUM_LEAVES / NUM_SAMPLES));
                            return [3 /*break*/, 1];
                        case 5: return [2 /*return*/];
                    }
                });
            }); });
        });
    });
    describe('parseBalanceMap', function () {
        var distributor;
        var claims;
        beforeEach('deploy', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, innerClaims, merkleRoot, tokenTotal;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = (0, parse_balance_map_1.parseBalanceMap)((_b = {},
                            _b[wallet0.address] = 200,
                            _b[wallet1.address] = 300,
                            _b[wallets[2].address] = 250,
                            _b)), innerClaims = _a.claims, merkleRoot = _a.merkleRoot, tokenTotal = _a.tokenTotal;
                        (0, chai_1.expect)(tokenTotal).to.eq('0x02ee'); // 750
                        claims = innerClaims;
                        return [4 /*yield*/, (0, ethereum_waffle_1.deployContract)(wallet0, MerkleDistributor_json_1.default, [token.address, merkleRoot], overrides)];
                    case 1:
                        distributor = _c.sent();
                        return [4 /*yield*/, token.setBalance(distributor.address, tokenTotal)];
                    case 2:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        it('check the proofs is as expected', function () {
            var _a;
            (0, chai_1.expect)(claims).to.deep.eq((_a = {},
                _a[wallet0.address] = {
                    index: 0,
                    amount: '0xc8',
                    proof: ['0x2a411ed78501edb696adca9e41e78d8256b61cfac45612fa0434d7cf87d916c6'],
                },
                _a[wallet1.address] = {
                    index: 1,
                    amount: '0x012c',
                    proof: [
                        '0xbfeb956a3b705056020a3b64c540bff700c0f6c96c55c0a5fcab57124cb36f7b',
                        '0xd31de46890d4a77baeebddbd77bf73b5c626397b73ee8c69b51efe4c9a5a72fa',
                    ],
                },
                _a[wallets[2].address] = {
                    index: 2,
                    amount: '0xfa',
                    proof: [
                        '0xceaacce7533111e902cc548e961d77b23a4d8cd073c6b68ccf55c62bd47fc36b',
                        '0xd31de46890d4a77baeebddbd77bf73b5c626397b73ee8c69b51efe4c9a5a72fa',
                    ],
                },
                _a));
        });
        it('all claims work exactly once', function () { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _i, account, claim, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = [];
                        for (_b in claims)
                            _a.push(_b);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        account = _a[_i];
                        claim = claims[account];
                        return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(claim.index, account, claim.amount, claim.proof, overrides))
                                .to.emit(distributor, 'Claimed')
                                .withArgs(claim.index, account, claim.amount)];
                    case 2:
                        _d.sent();
                        return [4 /*yield*/, (0, chai_1.expect)(distributor.claim(claim.index, account, claim.amount, claim.proof, overrides)).to.be.revertedWith('MerkleDistributor: Drop already claimed.')];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5:
                        _c = chai_1.expect;
                        return [4 /*yield*/, token.balanceOf(distributor.address)];
                    case 6:
                        _c.apply(void 0, [_d.sent()]).to.eq(0);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
