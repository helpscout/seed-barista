/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('output.rule', function() {
  describe('mediaQuery', function() {
    var styles = `
      // From seed-flexy
      .o-flexy { box-sizing: border-box; align-items: center; display: flex; justify-content: space-between; }
      @media (min-width: 544px) { .o-flexy\\@sm { align-items: center; display: flex; justify-content: space-between; } }
      @media (min-width: 768px) { .o-flexy\\@md { align-items: center; display: flex; justify-content: space-between; } }
      @media (min-width: 992px) { .o-flexy\\@lg { align-items: center; display: flex; justify-content: space-between; } }

      @media tv and (min-width: 700px) and (orientation: landscape) { .o-tv\\@sm { align-items: center; display: flex; justify-content: space-between; } }
    `;
    var output = barista({
      content: styles,
    });

    it('should return the media query param from a rule', function() {
      var fx = output.rule('.o-flexy');
      var sm = output.rule('.o-flexy\@sm');

      expect(fx.exists()).to.be.true;
      expect(fx.mediaQuery()).to.be.false;
      expect(sm.exists()).to.be.true;
      expect(sm.mediaQuery()).to.not.be.false;
    });

    it('should return the AST of a media query', function() {
      var tv = output.rule('.o-tv\@sm');
      var mq = tv.mediaQuery();

      expect(mq).to.not.be.false;
      expect(mq.type).to.equal('tv');
      expect(mq.props.length).to.equal(2);
      expect(mq.props[0].modifier).to.equal('min');
      expect(mq.props[0].feature).to.equal('width');
      expect(mq.props[0].value).to.include('700');
    });

    it('should have an alias of .mq()', function() {
      var tv = output.rule('.o-tv\@sm');
      var mq = tv.mq();

      expect(mq).to.not.be.false;
      expect(mq.type).to.equal('tv');
      expect(mq.props.length).to.equal(2);
      expect(mq.props[0].modifier).to.equal('min');
      expect(mq.props[0].feature).to.equal('width');
      expect(mq.props[0].value).to.include('700');
    });
  });
});
