/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

const cssom = global.utils.cssom;

describe('utils', () => {
  describe('cssom', () => {
    describe('.isNestedRule()', () => {
      const fn = cssom.isNestedRule;

      it('should return true if valid (based on PostCSS AST)', () => {
        expect(fn()).to.be.false;
        expect(fn({})).to.be.false;
        expect(fn({ parent: true })).to.be.true;
      });
    });

    describe('.getRuleParams()', () => {
      const fn = cssom.getRuleParams;

      it('should return false if argument isn\'t a PostCSS nested rule', () => {
        expect(fn()).to.be.false;
        expect(fn({})).to.be.false;
        expect(fn({ parent: true })).to.be.false;
      });

      it('should return true argument is a valid PostCSS nested rule', () => {
        const params = '(min-width: 500px)';

        expect(fn({ parent: { params } })).to.equal(params);
      });
    });

    describe('.parse()', () => {
      it('should not parse unless arg is a valid string', () => {
        expect(utils.cssom.parse(true)).to.be.false;
        expect(utils.cssom.parse(1)).to.be.false;
        expect(utils.cssom.parse([])).to.be.false;
        expect(utils.cssom.parse({})).to.be.false;
        expect(utils.cssom.parse({ content: 'html {}'})).to.be.false;
        expect(utils.cssom.parse('')).to.be.false;
      });

      it('should parse valid css (string)', () => {
        const css = `
          .pinkhot {
            color: hotpink;
          }
        `;
        const cssom = utils.cssom.parse(css);

        expect(cssom).to.not.be.false;
        expect(cssom.nodes).to.exist;
        expect(cssom.source).to.exist;
        expect(cssom.type).to.equal('root');
      });
    });
  });
});
