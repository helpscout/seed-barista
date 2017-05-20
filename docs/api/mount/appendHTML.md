# .appendHTML()

Append DOM elements to Barista's virtual DOM by specifying HTML markup.


#### .append(markup)

| Argument | Type | Description |
| --- | --- | --- |
| markup | string | HTML markup to append into Barista's virtual DOM |


#### Requirements

Your `BaristaOutput` instance must first be mounted with `.mount()`.


#### Returns

`BaristaOutput`: The initial `output` instance.


#### Examples

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


#### Related

For a simpler method to append elements, check out [`.append()`](/append.md).
