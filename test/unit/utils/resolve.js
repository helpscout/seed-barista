/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const resolve = global.utils.resolve;

describe('utils', () => {
  describe('resolve', () => {
    describe('.includePaths()', () => {
      const fn = resolve.includePaths;

      it('should return empty array if args are invalid/undefied', () => {
        expect(fn()).to.be.an('array').and.to.be.empty;
        expect(fn('')).to.be.an('array').and.to.be.empty;
        expect(fn('', [])).to.be.an('array').and.to.be.empty;
      });
    });

    describe('.pathname()', () => {
      const fn = resolve.pathname;

      it('should return false args are invalid/undefied', () => {
        expect(fn()).to.be.false;
        expect(fn('')).to.be.false;
        expect(fn('root')).to.be.false;
        expect(fn('root', '')).to.be.false;
        expect(fn('', 'root')).to.be.false;
      });

      it('should remove root from final pathname', () => {
        expect(fn('root', 'root/src/file')).to.equal('root/src/file');
        expect(fn('root/src/', 'root/src/file')).to.equal('root/src/file');
        expect(fn('root/src/', 'root/src/root/src/file')).to.equal('root/src/file');
      });
    });

    describe('.stripRoot()', () => {
      const fn = resolve.stripRoot;

      it('should return false args are invalid/undefied', () => {
        expect(fn()).to.be.false;
        expect(fn('')).to.be.false;
        expect(fn('root')).to.be.false;
        expect(fn('root', '')).to.be.false;
        expect(fn('', 'root')).to.be.false;
      });

      it('should remove root from pathname', () => {
        expect(fn('root', 'root/src/file')).to.equal('/src/file');
        expect(fn('root/src/', 'root/src/file')).to.equal('file');
      });
    });

    describe('.sassPaths()', () => {
      const fn = resolve.sassPaths;

      it('should return an array of paths by default', () => {
        expect(fn()).to.be.an('array').and.to.not.be.empty;
      });

      it('should return empty array if invalid/undefied', () => {
        expect(fn({})).to.be.empty.and.to.be.an('array');
        expect(fn({ root: 'root', })).to.be.empty.and.to.be.an('array');
      });

      it('should return an array of paths with included options.includePaths', () => {
        expect(fn({ includePaths: ['wee'], root: 'root', })).to.include('root/wee');
      });

      it('should include seed paths if enabled', () => {
        const paths = fn({
          includePaths: ['wee'],
          root: 'root',
          includeSeedPaths: true,
        });

        expect(paths).to.include('root/wee');
        expect(paths[paths.length - 1]).to.include('seed');
      });

      it('should include paths defined in src', () => {
        const paths = fn({
          src: 'float',
          root: 'bear',
        });

        expect(paths).to.be.an('array');
        expect(paths).to.have.lengthOf(1);
        expect(paths[0]).to.include('bear/float');
      });
    });

    describe('.seedPaths()', () => {
      const fn = resolve.seedPaths;

      it('should return seed paths by default', () => {
        expect(fn()).to.be.an('array').and.not.be.empty;
      });

      it('should return harvester crawled array of paths if valid', () => {
        const paths = fn('hello');

        expect(paths).to.be.an('array');
        expect(paths).to.not.be.empty;
        expect(paths).to.include('hello');
        expect(paths).to.have.lengthOf.at.least(1);
      });
    });

    describe('.srcPaths()', () => {
      const fn = resolve.srcPaths;

      it('should return empty array by default', () => {
        expect(fn()).to.be.an('array').and.be.empty;
      });

      it('should return empty array if args are invalid', () => {
        expect(fn(true, 'awesome')).to.be.an('array').and.be.empty;
      });

      it('should an array of concatted root + src', () => {
        const src = fn('root', 'src');

        expect(src).to.be.an('array').and.not.be.empty;
        expect(src).to.have.lengthOf(1);
        expect(src[0]).to.equal('root/src');
      });

      it('should consolidate slashes in root and src', () => {
        const src = fn('super/root/', 'src.scss');

        expect(src[0]).to.equal('super/root/src.scss');
      });
    });
  });
});
