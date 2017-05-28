/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

describe('utils', () => {
  describe('cssom.parse', () => {
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
