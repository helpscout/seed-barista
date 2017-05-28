/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const cssFile = global.utils.cssFile;

describe('utils', () => {
  describe('cssFile', () => {
    describe('.getPath()', () => {
      it('should return false if arguments are invalid', () => {
        expect(cssFile.getPath()).to.be.false;
        expect(cssFile.getPath({}, '')).to.be.false;
        expect(cssFile.getPath({}, 'file.scss')).to.be.false;
      });

      it('should return false if both options.root and options.src are undefied', () => {
        expect(cssFile.getPath({ root: 'files', }, 'file.scss')).to.be.false;
        expect(cssFile.getPath({ src: 'files', }, 'file.scss')).to.be.false;
      });

      it('should a file path combining root, src, and file', () => {
        const path = cssFile.getPath({ root: 'root', src: 'src', }, 'file.scss');

        expect(path).to.equal('root/src/file.scss');
      });
    });

    describe('.exists()', () => {
      it('should return false if arguments are invalid', () => {
        expect(cssFile.exists()).to.be.false;
        expect(cssFile.exists({}, '')).to.be.false;
        expect(cssFile.exists({}, 'file.scss')).to.be.false;
      });

      it('should return false if file doesn\'t exist', () => {
        const fileExists = cssFile.exists({ root: 'root', src: 'src', }, 'file.scss');

        expect(fileExists).to.be.false;
      });
    });
  });
});
