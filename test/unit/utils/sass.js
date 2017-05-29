/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const sass = global.utils.sass;

describe('utils', () => {
  describe('sass', () => {
    describe('.getOptions()', () => {
      const fn = sass.getOptions;

      it('should return false if invalid arg (options)', () => {
        expect(fn('path')).to.be.false;
        expect(fn()).to.be.false;
      });

      it('should return options with valid configs', () => {
        expect(fn({ content: 'html' })).to.not.be.empty;
      });
    });

    describe('.render()', () => {
      const fn = sass.render;
      it('should return false if invalid arg (options)', () => {
        const output = fn('h1 { color: red; }');

        expect(fn()).to.be.false;
        expect(output).to.be.false;
      });

      it('should render CSS with valid option.content', () => {
        const output = sass.render({ content: 'h1 { color: black; }' });

        expect(output).to.be.a('string');
        expect(output).to.contain('h1');
      });

      it('should render SCSS with valid option.content', () => {
        const output = sass.render({ content: 'h1 { color: black; a { display: block; } }' });

        expect(output).to.be.a('string');
        expect(output).to.contain('h1 a');
      });
    });
  });
});
