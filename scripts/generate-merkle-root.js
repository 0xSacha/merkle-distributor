"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var fs_1 = __importDefault(require("fs"));
var parse_balance_map_1 = require("../src/parse-balance-map");
commander_1.program
    .version('0.0.0')
    .requiredOption('-i, --input <path>', 'input JSON file location containing a map of account addresses to string balances');
commander_1.program.parse(process.argv);
var json = JSON.parse(fs_1.default.readFileSync(commander_1.program.input, { encoding: 'utf8' }));
if (typeof json !== 'object')
    throw new Error('Invalid JSON');
console.log(JSON.stringify((0, parse_balance_map_1.parseBalanceMap)(json)));
