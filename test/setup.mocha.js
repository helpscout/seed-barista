/* globals barista: true, expect: true, describe: true, it: true, sinon: true */

const assert = require('chai').assert;
const expect = require('chai').expect;
const sinon = require('sinon');
const barista = require('../index');
const BaristaOutput = require('../lib/output');

global.assert = assert;
global.barista = barista;
global.BaristaOutput = BaristaOutput;
global.expect = expect;
global.sinon = sinon;
