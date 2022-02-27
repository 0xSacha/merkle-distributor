'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var merkle_tree_1 = __importDefault(require('./merkle-tree'))
var ethers_1 = require('ethers')
var BalanceTree = /** @class */ (function () {
  function BalanceTree(balances) {
    this.tree = new merkle_tree_1.default(
      balances.map(function (_a) {
        var account = _a.account,
          amount = _a.amount
        return BalanceTree.toNode(account, amount)
      })
    )
  }
  BalanceTree.verifyProof = function (account, amount, proof, root) {
    var pair = BalanceTree.toNode(account, amount)
    for (var _i = 0, proof_1 = proof; _i < proof_1.length; _i++) {
      var item = proof_1[_i]
      pair = merkle_tree_1.default.combinedHash(pair, item)
    }
    return pair.equals(root)
  }
  // keccak256(abi.encode(index, account, amount))
  BalanceTree.toNode = function (account, amount) {
    return Buffer.from(ethers_1.utils.solidityKeccak256(['address', 'uint256'], [account, amount]).substr(2), 'hex')
  }
  BalanceTree.prototype.getHexRoot = function () {
    return this.tree.getHexRoot()
  }
  // returns the hex bytes32 values of the proof
  BalanceTree.prototype.getProof = function (account, amount) {
    return this.tree.getHexProof(BalanceTree.toNode(account, amount))
  }
  return BalanceTree
})()
exports.default = BalanceTree
