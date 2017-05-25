# seed-barista ☕️ [![Build Status](https://travis-ci.org/helpscout/seed-barista.svg?branch=master)](https://travis-ci.org/helpscout/seed-barista) [![npm version](https://badge.fury.io/js/seed-barista.svg)](https://badge.fury.io/js/seed-barista) [![dependencies Status](https://david-dm.org/helpscout/seed-barista/status.svg)](https://david-dm.org/helpscout/seed-barista)

Barista is a Javascript utility for (S)CSS unit testing, compatible with most major test runners and assertion libraries.

Seed isn't required for Barista to work. Although, Barista does make it easier to write tests for Seed CSS.

For added convenience, we recommend trying out [seed-bistro](https://github.com/helpscout/seed-bistro).<br>
It comes with Barista + other libraries for CSS testing goodness 🙌


## Install
```
npm install seed-barista --save-dev
```


## Basic Usage

### [Standard](/docs/api/standard.md)

Below is an example of how you can setup a [Mocha](https://mochajs.org/) test with Barista. A fast and simple way to test `.scss` output is to verify the rendered output matches against expected strings.

```javascript
var expect = require('chai').expect;
var barista = require('seed-barista');

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

Check out the full [API documentation](/docs/api/standard.md)



### [Mounted](/docs/api/mounted.md)

Mounted based testing creates a [virtual DOM](https://github.com/tmpvar/jsdom), allowing you to write assertions against DOM elements. Barista's Mounted API uses jQuery to retrieve computed CSS styles.

```javascript
var expect = require('chai').expect;
var barista = require('seed-barista');

describe('harry component styles', function() {
  it('should render a class of wizard + harry', function() {
    var output = barista({ file: '_wizard.scss' }).mount();
    var rule = output.find('.your-a-wizard.harry');

    expect(rule.length).to.be.true;
    expect(rule.css('background')).to.equal('red');
    expect(rule.css('color')).to.equal('yellow');
  });
});
```

Check out the full [API documentation](/docs/api/mounted.md)



## Examples

**Check out an [example test](https://github.com/helpscout/seed-barista/tree/master/test/examples)**
