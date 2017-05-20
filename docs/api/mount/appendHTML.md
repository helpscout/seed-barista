# .appendHTML()

Append DOM elements to Barista's virtual DOM by specifying HTML markup.


#### .appendHTML(markup)

| Argument | Type | Description |
| --- | --- | --- |
| markup | string | HTML markup to append into Barista's virtual DOM |


#### Requirements

Your `BaristaOutput` instance must first be mounted with `.mount()`.


#### Returns

`BaristaOutput`: The initial `output` instance.



## Examples

`.appendHTML()` provides a quick way to add virtual DOM elements. To test it the element's styles, you'll need to use the jQuery's handy `.css()` method.

```js
var output = barista({ ... }).mount();

// Adding the element(s)
output.appendHTML(`
  <div class="kip">
    <span class="cage-fighter">Training!</span>
  </div>
`);
// Getting the selector
var span = output.dom.$('div.kip span.cage-fighter');

// Testing the selector's CSS
expect(span.css('color')).to.equal('red');
expect(span.css('display')).to.equal('inline-block');
expect(span.css('position')).to.equal('relative');
```



## Details

```js
var output = barista({ ... }).mount();
output.appendHTML(`
  <div class="kip">
    <span class="cage-fighter"></div>
  </div>
`);
```

The above example will generate this markup, to be injected into the `body` of Barista's virtual DOM:
```html
<div class="kip">
  <span class="cage-fighter"></div>
</div>
```



## Related

For a simpler method to append elements, check out [`.append()`](append.md).
