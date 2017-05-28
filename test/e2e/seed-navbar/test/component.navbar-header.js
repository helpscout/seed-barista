// Test :: Component :: Navbar Header
/* globals describe: true, it: true */
'use strict';

describe('seed-navbar: component: navbar-header', function() {
  describe('base', function() {
    var style = `
      @import "./_index";
    `;
    var output = barista({ content: style });
    var $o = output.$('.c-navbar__header');

    it('should have box-sizing reset', function() {
      expect($o.prop('box-sizing')).to.equal('border-box');
    });

    it('should have correct flex properties', function() {
      expect($o.prop('align-items')).to.equal('center');
      expect($o.prop('display')).to.equal('flex');
      expect($o.prop('flex-direction')).to.equal('row');
      expect($o.prop('flex-wrap')).to.equal('nowrap');
      expect($o.prop('justify-content')).to.equal('flex-start');
    });

    it('should have position of relative', function() {
      expect($o.prop('position')).to.equal('relative');
    });

    it('should have a min-height defined', function() {
      expect(parseInt($o.prop('min-height'), 10)).to.be.above(0);
    });
  });
});
