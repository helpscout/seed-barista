// Test :: includeSeedPaths
'use strict';

var assert = require('chai').assert;
var barista = require('../index');
var some = require('lodash.some');

describe('barista { options: includeSeedPaths }', function() {
  it('should include seed-pack paths by default', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }'
    });
    var expect = some(output.includePaths, function(path) {
      return path.indexOf('seed-barista') >= 0;
    });
    assert.equal(expect, true);
  });

  it('should exclude seed-pack paths if set as false', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includeSeedPaths: false
    });
    var expect = some(output.includePaths, function(path) {
      return path.indexOf('seed-barista') >= 0;
    });
    assert.equal(expect, false);
  });
});
