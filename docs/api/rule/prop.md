# .prop()

#### .prop(property)

| Argument | Type | Description |
| --- | --- | --- |
| property | string | The CSS property to retrieve. |


#### Returns

| Return | Type | Description |
| --- | --- | --- |
| prop | string | The CSS property retrieved. |


#### Aliases

* `getProp()`



## Examples


```js
var output = barista({ ... });
var rule = output.rule('.vote-pedro');

expect(rule.prop('position')).to.equal('absolute');
```
