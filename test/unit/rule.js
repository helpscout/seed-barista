/* globals barista: true, expect: true, describe: true, it: true, lib: true, sinon: true, utils: true */

const Rule = global.lib.rule;
const cssom = global.utils.cssom;

describe('rule', () => {
  it('should return false if data (arg) is invalid', () => {
    expect(new Rule()).to.be.empty;
    expect(new Rule({})).to.be.empty;
    expect(new Rule([])).to.be.empty;
    expect(new Rule('.body { background: black; }')).to.be.empty;
  });

  describe('create', () => {
    const cssData = cssom.parse('body { background: white; }');

    it('should not create rule without selector if selector is invalid', () => {
      const rule = new Rule(cssData).create();

      expect(rule.selectors).to.be.empty;
    });

    it('should not create rule without selector if selector doesn\'t exist', () => {
      const rule = new Rule(cssData).create('html');

      expect(rule.selectors).to.be.empty;
    });

    it('should create rule with CSSOM (PostCSS AST)', () => {
      const rule = new Rule(cssData).create('body');

      expect(rule).to.not.be.empty;
      expect(rule.nodes).to.exist;
      expect(rule.nodes).to.not.be.empty;
      expect(rule.selectors.length).to.be.above(0);
    });
  });

  describe('at', () => {
    const cssData = cssom.parse(`
      @media screen (min-width: 500px) {
        body { background: white; }
      }
    `);
    const rule = new Rule(cssData).create('body');

    it('should not find rule if keyword is invalid', () => {
      expect(rule.at('').exists()).to.be.false;
      expect(rule.at(true).exists()).to.be.false;
      expect(rule.at(500).exists()).to.be.false;
    });

    it('should find rule based on string keyword', () => {
      const ruleAt = rule.at('screen (min-width: 500px)');

      expect(ruleAt).to.not.be.false;
      expect(ruleAt.selectors).to.not.be.empty;
    });

    it('should find rule based on array of keyword', () => {
      const ruleAt = rule.at(['min', '500']);

      expect(ruleAt).to.not.be.false;
      expect(ruleAt.selectors).to.not.be.empty;
    });
  });
});
