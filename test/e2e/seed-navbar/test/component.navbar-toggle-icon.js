// Test :: Component :: Navbar Toggle Icon
/* globals describe: true, it: true */
'use strict';

describe('seed-navbar: component: navbar-toggle-icon', function() {
  describe('base', function() {
    var style = `
      @import "./_index";
    `;
    var output = barista({ content: style });
    var $o = output.$('.c-navbar__toggle-icon');

    it('should have box-sizing reset', function() {
      expect($o.prop('box-sizing')).to.equal('border-box');
    });

    it('should have correct display', function() {
      expect($o.prop('display')).to.equal('block');
    });

    it('should have correct position', function() {
      expect($o.prop('position')).to.equal('relative');
    });

    it('should have sizing defined', function() {
      expect($o.prop('height')).to.exist;
      expect($o.prop('width')).to.exist;
    });

    it('should have a color defined', function() {
      expect($o.prop('color')).to.exist;
    });
  });
});
