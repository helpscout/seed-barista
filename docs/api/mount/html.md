# html()

Generate DOM elements to Barista's virtual DOM by specifying HTML markup.

All previous elements are removed ebfore the newly generated elements are added.


#### .html(markup)

| Argument | Type | Description |
| --- | --- | --- |
| markup | string | HTML markup to append into Barista's virtual DOM |


#### Requirements

Your `BaristaOutput` instance must first be mounted with `.mount()`.


#### Returns

`BaristaOutput`: The initial `output` instance.


---


### Examples

`.html()` provides a quick way to add virtual DOM elements. To test it the element's styles, you'll need to use the jQuery's handy `.css()` method.

```js
var output = barista({ ... }).mount();

// Adding the element(s)
output.html(`
  <div class="kip">
    <span class="cage-fighter">Training!</span>
  </div>
`);
// Getting the selector
var span = output.dom.$('div.kip span.cage-fighter');

// Testing the selector's CSS
expect(span.css('color')).to.equal('red');
expect(span.css('display')).to.equal('inline-block');
expect(span.css('display')).to.equal('inline-block');
```


#### Details

```js
var output = barista({ ... }).mount();
output.html(`
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

Note: If you use this method again, it will remove your previous DOM elements.

```js
output.html(`
  <div class="napolean">
    <span class="sweet-jump"></div>
  </div>
`);
```

Barista's virtual DOM is now:

```html
<div class="napolean">
  <span class="sweet-jumps"></div>
</div>
```


---


#### Related

For a simpler method to generate elements, check out [`.render()`](render.md).
