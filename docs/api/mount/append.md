# .append()

Append DOM elements to Barista's virtual DOM by specifying selectors.


#### .append(selector)

| Argument | Type | Description |
| --- | --- | --- |
| selector | string | Selectors to generate and append into Barista's virtual DOM |


#### Requirements

Your `BaristaOutput` instance must first be mounted with `.mount()`.


#### Returns

`BaristaOutput`: The initial `output` instance.


#### Examples

```js
var output = barista({ ... }).mount();
output.append('div.kip span.cage-fighter');
```

The above example will generate this markup, to be injected into the `body` of Barista's virtual DOM:
```html
<div class="kip">
  <span class="cage-fighter"></div>
</div>
```


#### Related

For an advanced method to append elements, check out [`.appendHTML()`](appendHTML.md).
