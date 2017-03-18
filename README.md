# seed-barista

Test runner helper for Seed CSS


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

```javascript
var assert = require('chai').assert;
var barista = require('seed-barista');

describe('your CSS test', function() {
  it('should return false if no file is defined', function() {
    var output = barista({ file: '_wizard.scss' });
    var expect = output.css.indexOf('.your-a-wizard.harry {') >= 0;
    assert.equal(expect, true);
  });
});
```



## Output

Barista returns an `object` after your (S)CSS file (or string) has been parsed:

* output.css: A `string` with the rendered CSS.
* output.data: An `object` containing a parsed CSS tree (powered by [reworkcss/css](https://github.com/reworkcss/css).

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

`output.data` results:
```
{
  "type": "stylesheet",
  "stylesheet": {
    "rules": [
      {
        "type": "rule",
        "selectors": [
          "body"
        ],
        "declarations": [
          {
            "type": "declaration",
            "property": "background",
            "value": "#eee",
            "position": {
              "start": {
                "line": 2,
                "column": 3
              },
              "end": {
                "line": 2,
                "column": 19
              }
            }
          },
          {
            "type": "declaration",
            "property": "color",
            "value": "#888",
            "position": {
              "start": {
                "line": 3,
                "column": 3
              },
              "end": {
                "line": 3,
                "column": 14
              }
            }
          }
        ],
        "position": {
          "start": {
            "line": 1,
            "column": 1
          },
          "end": {
            "line": 4,
            "column": 2
          }
        }
      }
    ]
  }
}
```



## Options

### src
**Type**: `string`
**Default**: `/test/scss`

```js
var output = barista({
  src: '/my-custom-test-dir/styles',
});
```


### includePaths
**Type**: `array`
**Default**: `[]`

Paths for Sass dependencies you wish to pass onto [node-sass](https://github.com/sass/node-sass#includepaths).

**Note**: During the node-sass render phase, `includePaths` will be enhanced by [sass-pathfinder](https://github.com/itsjonq/sass-pathfinder). This helps flatten and de-duplicate paths. These enhancements allow you to pass nested arrays into the `includePaths` options.


### includeSeedPaths
**Type**: `boolean`
**Default**: `true`

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


### content
**Type**: `string`
**Default**: `null`
**Special**: `file` or `content` must be defined.

```js
var output = barista({
  content: '.maple { padding: 0; }',
});
```
