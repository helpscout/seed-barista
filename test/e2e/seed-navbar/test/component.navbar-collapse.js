// Test :: Component :: Navbar Collapse
/* globals describe: true, it: true */
'use strict';

describe('seed-navbar: component: collapse', function() {
  describe('base', function() {
    var style = `
      @import "./_index";
    `;
    var output = barista({ content: style });
    var $o = output.$('.collapse');

    it('should have box-sizing reset', function() {
      expect($o.prop('box-sizing')).to.equal('border-box');
    });

    it('should be hidden by default', function() {
      expect($o.prop('display')).to.equal('none');
    });

    it('should be visible when triggered', function() {
      expect(output.$('.collapse.in').prop('display')).to.equal('block');
      expect(output.$('.collapse.show').prop('display')).to.equal('block');
    });

    it('should have collapsing animation class', function() {
      var $o = output.$('.collapsing');

      expect($o.exists()).to.be.true;
      expect($o.prop('height')).to.exist;
      expect($o.prop('transition-duration')).to.exist;
      expect($o.prop('transition-property')).to.exist;
    });
  });
});
