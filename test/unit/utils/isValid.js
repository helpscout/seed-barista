/* globals barista: true, expect: true, describe: true, it: true, sinon: true, utils: true */

describe('utils', () => {
  describe('isValid.options', () => {
    it('should be invalid for non-object arguments', () => {
      expect(utils.isValid.options(0)).to.be.false;
      expect(utils.isValid.options('a')).to.be.false;
      expect(utils.isValid.options([1])).to.be.false;
      expect(utils.isValid.options(true)).to.be.false;
      expect(utils.isValid.options(false)).to.be.false;
      expect(utils.isValid.options(null)).to.be.false;
    });

    it('should be invalid if object (arg) is empty', () => {
      const options = {};

      expect(utils.isValid.options(options)).to.be.false;
    });

    it('should be invalid if object empty doesn\'t have file or content', () => {
      const options = {
        setting: true,
      };

      expect(utils.isValid.options(options)).to.be.false;
    });

    it('should be invalid if option.file isn\'t a valid string', () => {
      expect(utils.isValid.options({ file: null })).to.be.false;
      expect(utils.isValid.options({ file: true })).to.be.false;
      expect(utils.isValid.options({ file: '' })).to.be.false;
      expect(utils.isValid.options({ file: 'yes' })).to.be.true;
    });

    it('should be invalid if option.content isn\'t a valid string', () => {
      expect(utils.isValid.options({ content: null })).to.be.false;
      expect(utils.isValid.options({ content: true })).to.be.false;
      expect(utils.isValid.options({ content: '' })).to.be.false;
      expect(utils.isValid.options({ content: 'yes' })).to.be.true;
    });
  });
});
