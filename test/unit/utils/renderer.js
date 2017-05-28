/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const renderer = global.utils.renderer;

describe('utils', () => {
  describe('renderer', () => {
    it('should return false for invalid args', () => {
      expect(renderer(true, '')).to.be.false;
      expect(renderer(true, '.selector')).to.be.false;
      expect(renderer({}, '.selector')).to.be.false;
    });
  });
});
