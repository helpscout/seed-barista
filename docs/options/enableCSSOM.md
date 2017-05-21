# enableCSSOM

Setting to enable PostCSS parsing that generates the CSS object model (using PostCSS's abstract syntax tree).

| Type | Default | Description |
| --- | --- | --- |
| Boolean | `true` | Determines of an CSS object model will be included in the output. |



## Examples

```js
var output = barista({
  enableCSSOM: false,
});
```

Note: Setting it to false will result in `output.data` and `output.rule()` returning `false`, since both rely on the CSSOM.
