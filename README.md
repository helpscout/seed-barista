# seed-barista ☕️ [![Build Status](https://travis-ci.org/helpscout/seed-barista.svg?branch=master)](https://travis-ci.org/helpscout/seed-barista) [![npm version](https://badge.fury.io/js/seed-barista.svg)](https://badge.fury.io/js/seed-barista) [![dependencies Status](https://david-dm.org/helpscout/seed-barista/status.svg)](https://david-dm.org/helpscout/seed-barista)

Helper to write tests for (S)CSS

For added convenience, we recommend trying out [seed-bistro](https://github.com/helpscout/seed-bistro).<br>
It comes with Barista + other libraries for CSS testing goodness 🙌

**Table of Contents**

- [Install](#install)
- [Basic Usage](#basic-usage)
- [Documentation](#documentation)
- [Examples](#examples)


## Install
```
npm install seed-barista --save-dev
```



## Basic Usage

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



## Documentation




## Examples
