# outputStyle

Determines the output format of the final CSS style.

| Type | Default | Description |
| --- | --- | --- |
| String | `nested` | Output style of the compiled CSS, provided by Node Sass. |

**Values**: `nested`, `expanded`, `compact`, `compressed`



## Examples

```js
var output = barista({
  outputStyle: 'compressed',
});
```
