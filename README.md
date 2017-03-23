# seed-barista ☕️ [![Build Status](https://travis-ci.org/helpscout/seed-barista.svg?branch=master)](https://travis-ci.org/helpscout/seed-barista) [![npm version](https://badge.fury.io/js/seed-barista.svg)](https://badge.fury.io/js/seed-barista) [![dependencies Status](https://david-dm.org/helpscout/seed-barista/status.svg)](https://david-dm.org/helpscout/seed-barista)

Test helper for Seed CSS


**Table of Contents**

- [Install](#install)
- [Basic Usage](#basic-usage)
- [Output](#output)
- [Options](#options)
- [Parser](#parser)


## Install
```
npm install seed-barista --save-dev
```



## Basic Usage

Below is an example of how you can setup a [Mocha](https://mochajs.org/) test with Barista. A fast and simple way to test `.scss` output is to verify the rendered output matches against expected strings.

```javascript
var assert = require('chai').assert;
var barista = require('seed-barista');

describe('your CSS test', function() {
  it('should render a class of wizard + harry', function() {
    var output = barista({ file: '_wizard.scss' });
    var expect = output.css.indexOf('.your-a-wizard.harry {') >= 0;
    assert.isOk(expect);
  });
});
```

**Enhanced** example using Barista's parser:
```javascript
var assert = require('chai').assert;
var barista = require('seed-barista');

describe('your CSS test', function() {
  it('should render a class of wizard + harry', function() {
    var output = barista({ file: '_wizard.scss' });
    var $o = output.$('.your-a-wizard.harry');
    assert.isOk($o.exists());
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
  content: '.milk { margin: ceil(5 / 2) * 1px; }',
});

console.log(output.css);
// .milk { margin: 3px; }
```

### output.data
```js
var output = barista({
  content: 'body { background: #eee; color: #888; }',
});
```

`output.data` results in a PostCSS AST (abstract syntax tree) node via it's [parse](https://github.com/postcss/postcss/blob/master/lib/postcss.es6#L146) method.



## Options

### src
**Type**: `string`
**Default**: `/test/scss`

Location of (S)CSS test files.

```js
var output = barista({
  src: '/my-custom-test-dir/styles',
});
```


### includePaths
**Type**: `array`
**Default**: `[]`

```js
var output = barista({
  includePaths: [
    require('seed-button'),
    require('some-external-css-library'),
    require('bootstrap-sass'),
  ],
});
```

Paths for Sass dependencies you wish to pass onto [node-sass](https://github.com/sass/node-sass#includepaths).

**Note**: During the node-sass render phase, `includePaths` will be enhanced by [sass-pathfinder](https://github.com/itsjonq/sass-pathfinder). This helps flatten and de-duplicate paths. These enhancements allow you to pass nested arrays into the `includePaths` options.


### includeSeedPaths
**Type**: `boolean`
**Default**: `true`

```js
var output = barista({
  includeSeedPaths: false,
});
```

Barista was created to help write tests for Seed packs. By default, Barista will automatically include paths defined in a Seed pack's `index.js`. To disable this behaviour, set `includeSeedPaths` to `false`.


### file
**Type**: `string`
**Default**: `null`
**Special**: `file` or `content` must be defined.

```js
var output = barista({
  file: 'my-test-css-file.scss',
});
```

File that you would like Barista to parse. Barista accepts both `.css` and `.scss` file types.


### outputStyle
**Type**: `string`
**Default**: `nested`
**Values**: `nested`, `expanded`, `compact`, `compressed`

Determines the output format of the final CSS style.

```js
var output = barista({
  outputStyle: 'compressed',
});
```


## Parser

The [output](#output) of Barista provides a PostCSS parser that makes it easier to write tests. The parser is initialized using a jQuery style method.

Check out this [example test](https://github.com/helpscout/seed-barista/blob/master/test/examples/parser.js) to see how Barista's parser can be used to write tests.

Example:

```js
var style = `
  .button {
    background: red;
    &:hover {
      background: blue;
    }
  }
`;
var output = barista({ content: style });
var $o = output.$('.button');
```

`barista.$()` is a handy wrapper that provides a handful of methods that retrieves CSS properties and value from parsing the `postcss.parse` AST node structure.

Example:

```js
var style = `
  .button {
    background: red;
    &:hover {
      background: blue;
    }
  }
`;
var output = barista({ content: style });
var $o = output.$('.button:hover');

assert.equal($o.getProp('background'), 'blue');
```


### $(selector)
**Type**: `string`

The selector to search the PostCSS data structure.

```js
var $o = output.$('.button:hover');
```


### exists()
**Returns**: `boolean`

Returns a boolean on whether or not the selector exists in the CSS.

```js
var $o = output.$('.button:hover');
console.log($o.exists());
// true
```

### getProp(prop)
**Type**: `string`
**Returns**: `string` || `false`

Retrieves the CSS property value of a selector.

```js
var $o = output.$('.button:hover');
var prop = $o.getProp('background'); // red
```


### getProps()
**Returns**: `array`

Returns an array all the CSS properties of a selector.

```js
var $o = output.$('.button:hover');
var prop = $o.getProps();

// [{ prop: 'background', value: 'red' }]
```


### getPropData(prop)
**Type**: `string`
**Returns**: `object`

Returns the PostCSS declaration object of a CSS property from a selector.

```js
var $o = output.$('.button:hover');
var prop = $o.getPropData('background');
```


### hasProp(prop)
**Type**: `string`
**Returns**: `boolean`

Checks to see if the selector has a specific CSS property.

```js
var $o = output.$('.button:hover');
var prop = $o.hasProp('margin-left');
// false
```


### media()
**Returns**: `object` || `false`

Checks to see if the selector has media queries.

```js
var $o = output.$('.button:hover');
var mediaQuery = $o.media();
console.log(mediaQuery.params);
// (max-width: 600px)
```
