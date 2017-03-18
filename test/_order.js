// Test :: Barista
'use strict';

var assert = require('chai').assert;
var barista = require('../index');

describe('barista.order', function() {
  it('should return false if no options are passed', function() {
    var output = barista.order();
    assert.equal(output, false);
  });

  it('should return false if options are blank', function() {
    var output = barista.order({});
    assert.equal(output, false);
  });

  it('should return false if options are not an object', function() {
    assert.equal(barista.order([]), false);
    assert.equal(barista.order(1), false);
    assert.equal(barista.order('a'), false);
    assert.equal(barista.order(true), false);
  });
});
