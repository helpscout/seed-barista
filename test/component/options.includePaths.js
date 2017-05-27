/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

var findRoot = require('find-root');
var path = require('path');
var root = findRoot(__dirname).split('/node_modules')[0];
var some = require('lodash.some');

describe('options: includePaths', function() {
  it('should extend default includePaths with custom paths', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includePaths: ['/styles/hello'],
    });
    var customPaths = some(output.includePaths, function(p) {
      return p === path.join(root, '/styles/hello');
    });
    var seedPaths = some(output.includePaths, function(p) {
      return p.indexOf('seed-props') >= 0;
    });
    var expect = customPaths && seedPaths;

    assert.isOk(expect);
  });

  it('should accept multiple paths in array', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includePaths: ['one', 'two', 'three'],
    });
    var expect = some(output.includePaths, function(path) {
      return path.indexOf('two') >= 0;
    });

    assert.isOk(expect);
  });

  it('should accept nested arrays of paths', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includePaths: ['one', 'two', ['three', ['four'], 'five']],
    });
    var expect = some(output.includePaths, function(path) {
      return path.indexOf('four') >= 0;
    });

    assert.isOk(expect);
  });

  it('should strip root path from paths submitted to includePaths', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includePaths: [path.join(root, 'one')],
    });
    var includePath = output.includePaths.find(p => p.includes('one'));

    expect(includePath.includes(`${root}${root}`)).to.be.false;
  });

  it('should strip extra root path from includePaths, but preserve initial root', function() {
    var output = barista({
      content: '.pink-hot-is { color: hotpink; }',
      includePaths: [path.join(root, 'one')],
    });
    var includePath = output.includePaths.find(p => p.includes('one'));

    expect(includePath.includes(`${root}${root}`)).to.be.false;
    expect(includePath.includes(root)).to.be.true;
    expect(includePath.indexOf(root)).to.equal(0);
  });
});
