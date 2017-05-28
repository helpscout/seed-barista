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

    describe('.isRule()', () => {
      const fn = cssom.isRule;

      it('should return true if valid (based on PostCSS AST)', () => {
        expect(fn()).to.be.false;
        expect(fn({})).to.be.false;
        expect(fn({ type: 'rule' })).to.be.true;
      });
    });

    describe('.isSelector()', () => {
      const fn = cssom.isSelector;

      it('should return true if valid (based on PostCSS AST)', () => {
        expect(fn()).to.be.false;
        expect(fn({})).to.be.false;
        expect(fn({ nodes: true })).to.be.true;
      });
    });

    describe('.findSelectorsFromNodes()', () => {
      const fn = cssom.findSelectorsFromNodes;

      it('should return false if invalid args', () => {
        expect(fn()).to.be.false;
        expect(fn(true, '')).to.be.false;
        expect(fn({}, '.body')).to.be.false;
      });

      it('should return empty array if selectors cannot be found from nodes', () => {
        expect(fn([{ selector: '.html' }], '.body')).to.be.an('array').and.to.have.lengthOf(0);
      });

      it('should return selector it exists in node', () => {
        expect(fn([{ selector: '.body' }], '.body')).to.be.an('array').and.to.have.lengthOf(1);
      });
    });

    describe('.findSelectorFromParamsByString()', () => {
      const fn = cssom.findSelectorFromParamsByString;

      it('should return false if invalid args', () => {
        expect(fn()).to.be.false;
        expect(fn(true, '')).to.be.false;
        expect(fn({}, '.body')).to.be.false;
      });
    });

    describe('.findSelectorFromParamsByArray()', () => {
      const fn = cssom.findSelectorFromParamsByArray;

      it('should return false if invalid args', () => {
        expect(fn()).to.be.undefined;
        expect(fn(true, '')).to.be.false;
        expect(fn({}, '.body')).to.be.false;
        expect(fn([], '.body')).to.be.false;
        expect(fn([], [])).to.be.undefined;
      });
    });

    describe('.getAtRules()', () => {
      const fn = cssom.getAtRules;

      it('should return empty array if invalid args', () => {
        expect(fn()).to.be.an('array').and.have.lengthOf(0);
        expect(fn([], '')).to.be.an('array').and.have.lengthOf(0);
      });
    });

    describe('.getAtRuleFromSelector()', () => {
      const fn = cssom.getAtRuleFromSelector;

      it('should return false if selector isn\'t a nested rule', () => {
        expect(fn()).to.be.false;
        expect(fn('.selector')).to.be.false;
        expect(fn({ selector: '.selector'})).to.be.false;
      });

      it('should return rule if selector is a nested rule', () => {
        expect(fn({ parent: { type: 'atrule' } })).to.not.be.false;
      });
    });

    describe('.getParamNodes', () => {
      const fn = cssom.getParamNodes;

      it('should return empty array if invalid args', () => {
        expect(fn()).to.be.an('array').and.to.have.lengthOf(0);
        expect(fn('true')).to.be.an('array').and.to.have.lengthOf(0);
        expect(fn(true)).to.be.an('array').and.to.have.lengthOf(0);
      });
    });

    describe('.getPropsFromSelector()', () => {
      const fn = cssom.getPropsFromSelector;

      it('should return false if invalid args', () => {
        expect(fn()).to.be.false;
        expect(fn({})).to.be.false;
      });
    });

    describe('.getPropDataFromSelector()', () => {
      const fn = cssom.getPropDataFromSelector;

      it('should return false if invalid args', () => {
        expect(fn()).to.be.false;
        expect(fn({}, '')).to.be.false;
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

    describe('.sanitizeParens()', () => {
      const fn = cssom.sanitizeParens;

      it('should return arg if arg (string) is invalid', () => {
        expect(fn('')).to.equal('');
        expect(fn(true)).to.equal(true);
        expect(fn(123)).to.equal(123);
      });

      it('should strip parenthesis', () => {
        expect(fn('((content))(rule)((()))')).to.not.contain('(');
        expect(fn('((content))(rule)((()))')).to.not.contain(')');
      });

      it('should return rule in lowercase', () => {
        expect(fn('(CoNtEnT)')).to.equal('content');
      });
    });
  });
});
