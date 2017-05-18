// Test :: Find
'use strict';

var barista = require('../index');
var expect = require('chai').expect;

describe('barista output.find', function() {
  var styles = `
    .one { background: blue };
    .one.mod { background: red };
    .one:hover {
      background: yellow;
    }
  `;
  var output = barista({
    content: styles,
  });

  it('should generate DOM elements and have access to jQuery\'s .css()', function() {
    expect(output.find('.one').css('background')).to.equal('blue');
    expect(output.find('.one.mod').css('background')).to.equal('red');
  });

  it('should generate complex selector rules', function() {
    var selector = '#omg ul li a button i.icon.icon-thing';
    var $o = output.find(selector);
    var $icon = output.DOM.$(selector);

    expect($icon.length).to.equal(1);
  });
});
