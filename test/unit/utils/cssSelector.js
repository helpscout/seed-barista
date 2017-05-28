/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const cssSelector = global.utils.cssSelector;

describe('utils', () => {
  describe('cssSelector', () => {
    describe('.inList()', () => {
      const fn = cssSelector.inList;

      it('should return false if arguments are invalid', () => {
        expect(fn()).to.be.false;
        expect(fn('', '')).to.be.false;
        expect(fn([], '')).to.be.false;
      });

      it('should return true if selector is present in list', () => {
        expect(fn(['.one', '.two', '.three'], '.three')).to.be.true;
      });

      it('should find selectors with backslash', () => {
        expect(fn(['.one', '.three\\@md'], '.three\\@md')).to.be.true;
      });
    });

    describe('.split()', () => {
      const fn = cssSelector.split;

      it('should return false if arguments are invalid', () => {
        expect(fn()).to.be.false;
        expect(fn('')).to.be.false;
      });

      it('should return array of split selectors', () => {
        const selectors = fn('.one, .two, .three');

        expect(selectors).to.not.be.empty;
        expect(selectors).to.be.an('array');
        expect(selectors).to.have.lengthOf(3);
      });
    });
  });
});
