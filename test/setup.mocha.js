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

global.options = {
  barista: require('../lib/defaults/barista'),
};

global.lib = {
  dom: require('../lib/dom'),
  output: require('../lib/output'),
  rule: require('../lib/rule'),
};

global.utils = {
  cssFile: require('../lib/utils/cssFile'),
  cssSelector: require('../lib/utils/cssSelector'),
  cssom: require('../lib/utils/cssom'),
  isValid: require('../lib/utils/isValid'),
  resolve: require('../lib/utils/resolve'),
};
