// Test :: Component :: Navbar
/* globals describe: true, it: true */
'use strict';

describe('seed-navbar: component: navbar', function() {
  var style = `
    @import "./_index";
  `;
  var output = barista({ content: style });

  describe('base', function() {
    var $o = output.$('.c-navbar');

    it('should have box-sizing reset', function() {
      expect($o.prop('box-sizing')).to.equal('border-box');
    });

    it('should have correct flex properties', function() {
      expect($o.prop('align-items')).to.equal('center');
      expect($o.prop('display')).to.equal('block'); // Becomes flex @md
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

  describe('integration', function() {
    describe('seed-dropdown', function() {
      it('should normalize the dropdown toggle appearance', function() {
        var $o = output.$('.c-navbar .c-dropdown__toggle');

        expect($o.exists()).to.be.true;
        expect($o.prop('appearance')).to.exist;
        expect($o.prop('appearance')).to.equal('none');
      });
    });

    describe('seed-nav', function() {
      it('should adjust the padding', function() {
        var $o = output.$('.c-navbar .c-nav__link');

        expect($o.exists()).to.be.true;
        expect($o.prop('padding-left')).to.exist;
        expect($o.prop('padding-right')).to.exist;
      });
    });
  });
});
