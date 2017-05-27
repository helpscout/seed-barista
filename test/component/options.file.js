/* globals barista: true, expect: true, describe: true, it: true, sinon: true */
'use strict';

describe('options: file', function() {
  it('should return false if no file is defined', function() {
    var output = barista({ yourawizard: 'harry' });

    assert.isNotOk(output);
  });

  it('should return false if option.file is not a string', function() {
    var output = barista({ file: 1 });

    assert.isNotOk(output);
  });

  it('should read CSS from a file defined in options', function() {
    var output = barista({
      src: 'test/component/scss',
      file: 'simple-css.scss'
    });
    var expect = output.css.indexOf('.simple') >= 0;

    assert.isOk(expect);
  });

  it('should return false if file doesn\'t exist', function() {
    var output = barista({
      file: 'fake-file.scss'
    });

    assert.isNotOk(output);
  });

  it('should read and compile SCSS from a file defined in options', function() {
    var output = barista({
      src: 'test/component/scss',
      file: 'simple-sass.scss'
    });
    var expect = output.css.indexOf('margin: 3') >= 0;

    assert.isOk(expect);
  });
});
