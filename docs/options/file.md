# file

File that you would like Barista to parse. Barista accepts both `.css` and `.scss` file types.

| Type | Default | Description |
| --- | --- | --- |
| String | `null` | Name of the (S)CSS file to parse. |

**Note**: `file` or `content` must be defined.



## Examples

```js
var output = barista({
  file: 'my-test-css-file.scss',
});
```
