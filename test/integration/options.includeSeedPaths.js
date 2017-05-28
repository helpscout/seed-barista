/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('options: includeSeedPaths', function() {
  it('should include seed-pack paths by default', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }'
    });
    var expect = output.includePaths.some(function(path) {
      return path.indexOf('seed-props') >= 0;
    });

    assert.isOk(expect);
  });

  it('should exclude seed-pack paths if set as false', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includeSeedPaths: false
    });
    var expect = output.includePaths.some(function(path) {
      return path.indexOf('seed-props') >= 0;
    });

    assert.isNotOk(expect);
  });
});
