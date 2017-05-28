// Test :: Component :: Navbar Brand
/* globals describe: true, it: true */
'use strict';

describe('seed-navbar: component: navbar-brand', function() {
  describe('base', function() {
    var style = `
      @import "./_index";
    `;
    var output = barista({ content: style });
    var $o = output.$('.c-navbar__brand');

    it('should have box-sizing reset', function() {
      expect($o.prop('box-sizing')).to.equal('border-box');
    });

    it('should have correct display property', function() {
      expect($o.prop('display')).to.equal('inline-block');
    });

    it('should reset line-height', function() {
      expect($o.prop('line-height')).to.equal('inherit');
    });

    it('should increase the font-size slightly be default', function() {
      expect($o.prop('font-size')).to.be.equal('1.25rem');
    });

    it('should have a default margin-right', function() {
      expect(parseInt($o.prop('margin-right').replace('rem', ''), 10)).to.be.above(0);
    });

    it('should have white-space reset', function() {
      expect($o.prop('white-space')).to.be.equal('nowrap');
    });
  });
});
