// Test :: Examples :: Parser
'use strict';

var assert = require('chai').assert;
var barista = require('../../index');
// Replace above with:
// var barista = require('seed-barista');

describe('example: test', function() {
  var styles = `
    .btn {
      background: blue;
      border: 1px solid;
      border-color: blue;
      &:hover {
        background: red;
      }
      &:active {
        background: purple;
      }
      &:focus {
        border-color: red;
        &:active {
          border-color: purple;
        }
      }
    };
  `;
  var output = barista({
    content: styles,
  });

  it('should have an active state + style', function() {
    var $o = output.$('.btn:active');

    assert.equal($o.getProp('background'), 'purple');
  });

  it('should have a focus state + style', function() {
    var $o = output.$('.btn:focus');

    assert.equal($o.getProp('border-color'), 'red');
  });

  it('should have a focus:active state + style', function() {
    var $o = output.$('.btn:focus:active');

    assert.equal($o.getProp('border-color'), 'purple');
  });
});
