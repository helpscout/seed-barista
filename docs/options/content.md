# content

Inline (S)CSS that you would like Barista to parse.

| Type | Default | Description |
| --- | --- | --- |
| String | `null` | (S)CSS syntax to be parsed by node-sass. |

**Note**: The option of `file` or `content` must be defined.



## Examples

```js
var output = barista({
  content: `
    .harry {
      background: red;
      color: yellow;

      &.is-a-wizard {
        position: absolute;
      }
    }
  `,
});
```
