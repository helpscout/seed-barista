/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('output.mount', function() {
  describe('.mount()', function() {
    it('should provide access to window, document, and dom after mounting', function() {
      var styles = `
        .one { background: blue };
      `;
      var output = barista({
        content: styles,
      }).mount();

      expect(output.dom).to.exist;
      expect(output.window).to.exist;
      expect(output.document).to.exist;
      expect(output.dom.window).to.equal(output.window);
      expect(output.dom.document).to.equal(output.document);
    });
  });

  describe('.append()', function() {
    var styles = `
      .one { background: blue };
    `;
    var output = barista({
      content: styles,
    }).mount();

    it('should only be able to append after mounting', function() {
      var styles = `
        .one { background: blue };
      `;
      var output = barista({
        content: styles,
      });

      this.cw = sinon.stub(console, 'warn');
      expect(output.append('.one')).to.be.false;
      this.cw.restore();
    });

    it('should append DOM elements', function() {
      output.append('div.hello');
      expect(output.document.body.childElementCount).to.equal(1);
      output.append('div.hello');
      expect(output.document.body.childElementCount).to.equal(2);
      output.append('div.hello ul li');
      expect(output.document.body.childElementCount).to.equal(3);
    });
  });

  describe('.appendHTML()', function() {
    var styles = `
      .one { background: blue };
    `;
    var output = barista({
      content: styles,
    }).mount();

    it('should only be able to appendHTML after mounting', function() {
      var styles = `
        .one { background: blue };
      `;
      var output = barista({
        content: styles,
      });

      this.cw = sinon.stub(console, 'warn');
      expect(output.appendHTML('<div>Hello</div>')).to.be.false;
      this.cw.restore();
    });

    it('should append markup to DOM', function() {
      output.appendHTML(`
        <div class="one">One</div>
      `);
      expect(output.dom.$('.one').length).to.equal(1);

      output.appendHTML(`
        <div class="one two">Two</div>
      `);
      expect(output.dom.$('.one').length).to.equal(2);
      expect(output.dom.$('.two').length).to.equal(1);
    });
  });


  describe('.html()', function() {
    var styles = `
      .one { background: blue };
    `;
    var output = barista({
      content: styles,
    }).mount();

    it('should only be able to append after mounting', function() {
      var styles = `
        .one { background: blue };
      `;
      var output = barista({
        content: styles,
      });

      this.cw = sinon.stub(console, 'warn');
      expect(output.html('<div class="something">Hello</div>')).to.be.false;
      this.cw.restore();
    });

    it('should add HTML markup', function() {
      output.html(`
        <h1>Hello</h1>
        <ul class="ex-id">
          <li class="sing-song">SG</li>
          <li class="oppa">HN</li>
          <li class="cat">LE</li>
          <li class="potato">HL</li>
          <li class="trash">JW</li>
        </ul>
      `);

      expect(output.dom.$('h1').length).to.equal(1);
      expect(output.dom.$('ul').length).to.equal(1);
      expect(output.dom.$('li').length).to.equal(5);
      expect(output.dom.$('.sing-song').length).to.equal(1);
      expect(output.dom.$('.oppa').length).to.equal(1);
      expect(output.dom.$('.cat').length).to.equal(1);
      expect(output.dom.$('.potato').length).to.equal(1);
      expect(output.dom.$('.trash').length).to.equal(1);
    });
  });

  describe('.render()', function() {
    var styles = `
      .one { background: blue };
    `;
    var output = barista({
      content: styles,
    }).mount();

    it('should only be able to render after mounting', function() {
      var styles = `
        .one { background: blue };
      `;
      var output = barista({
        content: styles,
      });

      this.cw = sinon.stub(console, 'warn');
      expect(output.render('.one')).to.be.false;
      this.cw.restore();
    });

    it('should render fresh DOM elements', function() {
      output.render('div.hello');
      expect(output.document.body.childElementCount).to.equal(1);
      output.render('div.wut');
      expect(output.document.body.childElementCount).to.equal(1);

      expect(output.dom.$('div.hello').length).to.equal(0);
      expect(output.dom.$('div.wut').length).to.equal(1);
    });

    it('should render complex selector rules', function() {
      var selector = '#omg ul li a button i.icon.icon-thing';
      output.render(selector);
      var $icon = output.dom.$(selector);

      expect($icon.length).to.equal(1);
    });
  });

  describe('.find()', function() {
    var styles = `
      .one { background: blue };
      .one.mod { background: red };
      .one:hover {
        background: yellow;
      }
    `;
    var output = barista({
      content: styles,
    }).mount();

    it('should only be able to find after mounting', function() {
      var styles = `
        .one { background: blue };
      `;
      var output = barista({
        content: styles,
      });

      this.cw = sinon.stub(console, 'warn');
      expect(output.find('.one')).to.be.false;
      this.cw.restore();
    });

    it('should return a jQuery instance', function() {
      expect(Object.getPrototypeOf(output.find('.one')).jquery).to.exist;
    });

    it('should generate DOM elements and have access to jQuery\'s .css()', function() {
      // expect(output.find('.one').css('background')).to.equal('blue');
      // expect(output.find('.one.mod').css('background')).to.equal('red');
    });
  });
});
