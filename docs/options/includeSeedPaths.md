# includeSeedPaths

Barista was created to help write tests for Seed packs. By default, Barista will automatically include paths defined in a Seed pack's `index.js`. To disable this behaviour, set `includeSeedPaths` to `false`.

| Type | Default | Description |
| --- | --- | --- |
| Boolean | `true` | Determines if Seed Pack paths should be added to `includePaths`. |



## Examples

```js
var output = barista({
  includeSeedPaths: false,
});
```
