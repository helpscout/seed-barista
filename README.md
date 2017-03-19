# seed-barista [![Build Status](https://travis-ci.org/helpscout/seed-barista.svg?branch=master)](https://travis-ci.org/helpscout/seed-barista) [![npm version](https://badge.fury.io/js/seed-barista.svg)](https://badge.fury.io/js/seed-barista)

Test helper for Seed CSS


**Table of Contents**

- [Install](#install)
- [Basic Usage](#basic-usage)
- [Output](#output)
- [Options](#options)


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
    assert.equal(expect, true);
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
