'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
var commander_1 = require('commander')
var fs_1 = __importDefault(require('fs'))
var ethers_1 = require('ethers')
commander_1.program
  .version('0.0.0')
  .requiredOption(
    '-i, --input <path>',
    'input JSON file location containing the merkle proofs for each account and the merkle root'
  )
commander_1.program.parse(process.argv)
var json = JSON.parse(fs_1.default.readFileSync(commander_1.program.input, { encoding: 'utf8' }))
var combinedHash = function (first, second) {
  if (!first) {
    return second
  }
  if (!second) {
    return first
  }
  return Buffer.from(
    ethers_1.utils.solidityKeccak256(['bytes32', 'bytes32'], [first, second].sort(Buffer.compare)).slice(2),
    'hex'
  )
}
var toNode = function (account, amount) {
  var pairHex = ethers_1.utils.solidityKeccak256(['address', 'uint256'], [account, amount])
  return Buffer.from(pairHex.slice(2), 'hex')
}
var verifyProof = function (account, amount, proof, root) {
  var pair = toNode(account, amount)
  for (var _i = 0, proof_1 = proof; _i < proof_1.length; _i++) {
    var item = proof_1[_i]
    pair = combinedHash(pair, item)
  }
  return pair.equals(root)
}
var getNextLayer = function (elements) {
  return elements.reduce(function (layer, el, idx, arr) {
    if (idx % 2 === 0) {
      // Hash the current element with its pair element
      layer.push(combinedHash(el, arr[idx + 1]))
    }
    return layer
  }, [])
}
var getRoot = function (balances) {
  var nodes = balances
    .map(function (_a) {
      var account = _a.account,
        amount = _a.amount
      return toNode(account, amount)
    })
    // sort by lexicographical order
    .sort(Buffer.compare)
  // deduplicate any eleents
  nodes = nodes.filter(function (el, idx) {
    return idx === 0 || !nodes[idx - 1].equals(el)
  })
  var layers = []
  layers.push(nodes)
  // Get next layer until we reach the root
  while (layers[layers.length - 1].length > 1) {
    layers.push(getNextLayer(layers[layers.length - 1]))
  }
  return layers[layers.length - 1][0]
}
if (typeof json !== 'object') throw new Error('Invalid JSON')
var merkleRootHex = json.merkleRoot
var merkleRoot = Buffer.from(merkleRootHex.slice(2), 'hex')
var balances = []
var valid = true
Object.keys(json.claims).forEach(function (address) {
  var claim = json.claims[address]
  var proof = claim.proof.map(function (p) {
    return Buffer.from(p.slice(2), 'hex')
  })
  balances.push({ account: address, amount: ethers_1.BigNumber.from(claim.amount) })
  if (verifyProof(address, claim.amount, proof, merkleRoot)) {
    console.log('Verified proof for', address)
  } else {
    console.log('Verification for', address, 'failed')
    valid = false
  }
})
if (!valid) {
  console.error('Failed validation for 1 or more proofs')
  process.exit(1)
}
console.log('Done!')
// Root
var root = getRoot(balances).toString('hex')
console.log('Reconstructed merkle root', root)
console.log('Root matches the one read from the JSON?', root === merkleRootHex.slice(2))
