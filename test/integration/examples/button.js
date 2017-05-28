// Test :: Examples :: Button
'use strict';

var expect = require('chai').expect;
// Add:
// var barista = require('seed-barista');

describe('example: test: button', function() {
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
    var rule = output.rule('.btn:active');

    expect(rule.prop('background')).to.equal('purple');
  });

  it('should have a focus state + style', function() {
    var rule = output.rule('.btn:focus');

    expect(rule.prop('border-color')).to.equal('red');
  });

  it('should have a focus:active state + style', function() {
    var rule = output.rule('.btn:focus:active');

    expect(rule.exists()).to.be.true;
    expect(rule.prop('border-color')).to.equal('purple');
  });
});
