# .html()

Generate DOM elements to Barista's virtual DOM by specifying HTML markup. All previous elements are removed ebfore the newly generated elements are added.


#### .html(markup)

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


#### Related

For a simpler method to generate elements, check out [`.render()`](render.md).
