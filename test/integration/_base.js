/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('base', function() {
  it('should return false if no options are passed', function() {
    var output = barista();

    assert.isNotOk(output);
  });

  it('should return false if options are blank', function() {
    var output = barista({});

    assert.isNotOk(output);
  });

  it('should return false if options are not an object', function() {
    assert.equal(barista([]), false);
    assert.equal(barista(1), false);
    assert.equal(barista('a'), false);
    assert.equal(barista(true), false);
  });

  it('should return an instance of BaristaOutput', function() {
    var output = barista({
      content: `
        .one { background: red };
      `,
    });

    assert.isOk(output);
    assert.isOk(output instanceof BaristaOutput);
  });
});
