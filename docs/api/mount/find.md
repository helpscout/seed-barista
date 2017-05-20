# .find()

Find the DOM elements from Barista's virtual DOM by specifying selectors.

These DOM elements are automatically generated and added into the DOM. All previous elements are removed ebfore the newly generated elements are added.


#### .find(selectors)

| Argument | Type | Description |
| --- | --- | --- |
| selectors | string | Selectors to generate and append into Barista's virtual DOM |


#### Requirements

Your `BaristaOutput` instance must first be mounted with `.mount()`.


#### Returns

`jQuery`: A JSDOM-based jQuery instance of the specified selector(s).


---


### Example

`.find()` provides a quick way to add and find a jQuery instance of a virtual DOM element. This allows you to use the jQuery's handy `.css()` method to test for CSS rules.

```js
var output = barista({ ... }).mount();
var span = output.find('div.kip span.cage-fighter');

expect(span.css('color')).to.equal('red');
expect(span.css('display')).to.equal('inline-block');
expect(span.css('display')).to.equal('inline-block');
```


#### Usage

```js
var output = barista({ ... }).mount();
var span = output.find('div.kip span.cage-fighter');
```

The above example will generate this markup, to be injected into the `body` of Barista's virtual DOM:
```html
<div class="kip">
  <span class="cage-fighter"></div>
</div>
```

Note: If you use this method again, it will remove your previous DOM elements.

```js
var ul = output.find('ul.napolean.skills li');
```
