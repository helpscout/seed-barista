/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
require('babel-register')();

import barista from '../../index';
import { expect } from 'chai';

describe('acceptance', () => {
  describe('ES6', () => {
    it('should execute standard test with ES6 import', () => {
      var styles = `
        .one { background: blue };
        .one.mod { background: red };
      `;
      var output = barista({
        content: styles,
      });

      expect(output.rule('.one').prop('background')).to.equal('blue');
    });

    it('should execute mounted with ES6 import', () => {
      var styles = `
        .one { background: blue };
        .one.mod { background: red };
      `;
      var output = barista({
        content: styles,
      }).mount();

      expect(output.find('.one').prop('background')).to.equal('blue');
    });
  });
});
