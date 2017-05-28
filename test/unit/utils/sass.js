/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const sass = global.utils.sass;

describe('utils', () => {
  describe('sass', () => {
    describe('render', () => {
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
