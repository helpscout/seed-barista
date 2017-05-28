/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const resolve = global.utils.resolve;

describe('utils', () => {
  describe('resolve', () => {
    describe('.seedPaths()', () => {
      const fn = resolve.seedPaths;

      it('should return empty array if invalid/undefied', () => {
        expect(fn()).to.be.empty;
        expect(fn()).to.be.an('array');
      });

      it('should return harvester crawled array of paths if valid', () => {
        const paths = fn('hello');

        expect(paths).to.be.an('array');
        expect(paths).to.not.be.empty;
        expect(paths).to.include('hello');
        expect(paths).to.have.lengthOf.at.least(1);
      });
    });
  });
});
