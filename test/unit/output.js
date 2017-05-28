/* globals barista: true, expect: true, describe: true, it: true, lib: true, sinon: true, utils: true */

const Output = global.lib.output;

describe('output', () => {
  it('should return empty props if invalid options', () => {
    const o = new Output();

    expect(o.dom).to.be.false;
    expect(o.window).to.be.false;
    expect(o.document).to.be.false;
    expect(o.mounted).to.be.false;
    expect(o.$()).to.be.false;
    expect(o.rule()).to.be.false;
    expect(o.css.length).to.equal(0);
    expect(o.data).to.be.empty;
    expect(o.includePaths).to.be.empty;
  });

  it('should return empty .rule() if invalid options', () => {
    expect(new Output().rule('.hello')).to.be.false;
    expect(new Output([]).rule('.hello')).to.be.false;
    expect(new Output({}).rule('.hello')).to.be.false;
  });
});
