// Test :: Component :: Navbar Toggle
/* globals describe: true, it: true */
'use strict';

describe('seed-navbar: component: navbar-toggle', function() {
  describe('base', function() {
    var style = `
      @import "./_index";
    `;
    var output = barista({ content: style });
    var $o = output.$('.c-navbar__toggle');

    it('should have box-sizing reset', function() {
      expect($o.prop('box-sizing')).to.equal('border-box');
    });

    it('should vertical center align child item(s)', function() {
      expect($o.prop('align-items')).to.equal('center');
      expect($o.prop('display')).to.equal('flex');
    });
  });
});
