# Barista

## Basic Usage

```js
var barista = require('seed-barista');
var expect = require('chai').expect;

describe('harry component styles', function() {
  it('should render a class of wizard + harry', function() {
    var output = barista({ file: '_wizard.scss' });
    var rule = output.rule('.your-a-wizard.harry');

    expect(rule.exists()).to.be.true;
    expect(rule.prop('background')).to.equal('red');
    expect(rule.prop('color')).to.equal('yellow');
  });
});
```


## Output

Barista returns an `object` after your (S)CSS file (or string) has been parsed:

* output.css: A `string` with the rendered CSS.
* output.data: An `object` containing a parsed CSS tree (powered by [PostCSS](https://github.com/postcss/postcss)).

### output.css
```js
var output = barista({
  content: '.maple { margin: ceil(5 / 2) * 1px; }',
});

console.log(output.css);
// .maple { margin: 3px; }
```

### output.data
```js
var output = barista({
  content: '.jay { background: #eee; color: #888; }',
});
```

`output.data` results in a PostCSS AST (abstract syntax tree) node via it's [parse](https://github.com/postcss/postcss/blob/master/lib/postcss.es6#L146) method.
