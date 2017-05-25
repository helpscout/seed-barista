# Mounted

Barista's mounted testing method is useful for tests that require DOM-based computed styles.


```javascript
var expect = require('chai').expect;
var barista = require('seed-barista');

describe('harry component styles', function() {
  it('should render a class of wizard + harry', function() {
    var output = barista({ file: '_wizard.scss' }).mount();
    var rule = output.find('.your-a-wizard.harry');

    expect(rule.length).to.be.above(1);
    expect(rule.css('background')).to.equal('red');
    expect(rule.css('color')).to.equal('yellow');
  });
});
```


* ** barista(options).mount()

| Argument | Type | Description |
| --- | --- | --- |
| options | object | Options for Barista. |

**See a [full list of options](../options.md)**



## Mounted API

Barista's Mounted API uses jQuery to retrieve computed CSS styles.

* **[`append()`](mount/append.md)**
* **[`appendHTML()`](mount/appendHTML.md)**
* **[`.find()`](mount/find.md)**
* **[`.html()`](mount/html.md)**
* **[`.render()`](mount/render.md)**
* **[`.renderHTML()`](mount/renderHTML.md)**
