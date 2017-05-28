/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

var some = require('lodash.some');

describe('options: includeSeedPaths', function() {
  it('should include seed-pack paths by default', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }'
    });
    var expect = some(output.includePaths, function(path) {
      return path.indexOf('seed-props') >= 0;
    });

    assert.isOk(expect);
  });

  it('should exclude seed-pack paths if set as false', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includeSeedPaths: false
    });
    var expect = some(output.includePaths, function(path) {
      return path.indexOf('seed-props') >= 0;
    });

    assert.isNotOk(expect);
  });
});
