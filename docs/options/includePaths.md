# includePaths

Paths for Sass dependencies you wish to pass onto [node-sass](https://github.com/sass/node-sass#includepaths).

| Type | Default | Description |
| --- | --- | --- |
| Array | `[]` | Paths to be passed to Node Sass' `includePaths` option. |



## Examples

```js
var output = barista({
  includePaths: [
    require('seed-button'),
    require('some-external-css-library'),
    require('bootstrap-sass'),
  ],
});
```

**Note**: During the node-sass render phase, `includePaths` will be enhanced by [sass-pathfinder](https://github.com/itsjonq/sass-pathfinder). This helps flatten and de-duplicate paths. These enhancements allow you to pass nested arrays into the `includePaths` options.
