# .append()


#### .append(selector)

| Argument | Type | Description |
| --- | --- | --- |
| selector | string | Selectors to generate and append into Barista's virtual DOM |


#### Returns

`BaristaOutput`: The initial `output` instance.


#### Examples

```js
var output = barista({ ... });
output.append('div.kip span.cage-fighter');
```

The above example will generate this markup, to be injected into the `body` of Barista's virtual DOM:
```html
<div class="kip">
  <span class="cage-fighter"></div>
</div>
```
