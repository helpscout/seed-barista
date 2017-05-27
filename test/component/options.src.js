/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('options: src', function() {
  it('should return false if defined src is not a string', function() {
    var output = barista({
      file: 'default-src.scss',
      src: true,
    });

    assert.isNotOk(output);
  });

  it('should return false if defined src is 0', function() {
    var output = barista({
      file: 'default-src.scss',
      src: 0,
    });

    assert.isNotOk(output);
  });

  it('should render files from custom path if defined', function() {
    var output = barista({
      file: 'custom-path-test.scss',
      src: 'test/component/custom-path-test/',
    });
    var expect = output.css.indexOf('.simple') >= 0;

    assert.isOk(expect);
  });
});
