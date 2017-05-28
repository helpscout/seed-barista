/* globals barista: true, expect: true, describe: true, it: true, lib: true, sinon: true, utils: true */

const DOM = global.lib.dom;

const styles = `
  .twentyseven {
    align-self: center;
  }
`;

describe('dom', () => {
  it('should return false if styles is invalid', () => {
    expect(new DOM()).to.be.empty;
    expect(new DOM(10)).to.be.empty;
    expect(new DOM([])).to.be.empty;
    expect(new DOM('')).to.be.empty;
  });

  it('should have window, document, and jQuery ($) loaded for valid styles', () => {
    const dom = new DOM(styles);

    expect(dom).to.not.be.empty;
    expect(dom.window).to.exist;
    expect(dom.document).to.exist;
    expect(dom.$).to.exist;
  });

  it('should be able to test CSS with $.css()', () => {
    const styles = `
      .twentyseven {
        align-self: center;
      }
    `;
    const dom = new DOM(styles);
    dom.$('body').html('<div class="twentyseven"></div>');
    const el = dom.$('.twentyseven');

    expect(el).to.exist;
    expect(el.length).to.equal(1);
    expect(el.css('align-self')).to.equal('center');
  });

  it('should track styles being added (with Array)', () => {
    const dom = new DOM('.one { color: blue; }');

    expect(dom.styles).to.exist;
    expect(dom.styles).to.be.an('array');
    expect(dom.styles.length).to.equal(1);
  });

  it('should reset virtual DOM environment on new instantiation', () => {
    const dom1 = new DOM('.one { color: blue; }');
    const dom2 = new DOM('.two { color: red; }');

    expect(dom1.styles.length).to.equal(1);
    expect(dom2.styles.length).to.equal(1);
  });

  it('should be able to add additional styles', () => {
    const dom = new DOM('.one { color: blue; }');
    dom.addStyle('.two { background: red; }');
    dom.$('body').html('<div class="one two"></div>');

    const el = dom.$('.one.two');

    expect(dom.styles.length).to.equal(2);
    expect(el.css('background')).to.equal('red');
    expect(el.css('color')).to.equal('blue');
  });

  it('should be able to retrieve css props with .prop()', () => {
    const dom = new DOM('.one { color: blue; }');
    dom.$('body').html('<div class="one"></div>');

    const el = dom.$('.one');

    expect(el.prop('color')).to.equal('blue');
  });
});
