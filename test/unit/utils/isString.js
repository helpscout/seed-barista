/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const isString = global.utils.isString;

describe('utils', () => {
  describe('isString', () => {
    it('should return false for non-strings', () => {
      expect(isString(0)).to.be.false;
      expect(isString(1)).to.be.false;
      expect(isString([])).to.be.false;
      expect(isString(true)).to.be.false;
      expect(isString(false)).to.be.false;
      expect(isString({})).to.be.false;
      expect(isString()).to.be.false;
    });

    it('should return false for empty strings', () => {
      expect(isString('')).to.be.false;
    });

    it('should return true for non-empty strings', () => {
      expect(isString('y')).to.be.true;
      expect(isString('yiss')).to.be.true;
      expect(isString('aw yiss')).to.be.true;
    });
  });
});
