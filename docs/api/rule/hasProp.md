# .hasProp()


#### .hasProp(property)

| Argument | Type | Description |
| --- | --- | --- |
| property | string | The CSS property to check. |


#### Returns

| Type | Description |
| --- | --- |
| boolean | `true`/`false` whether or not the property exists. |



## Examples


```js
var output = barista({ ... }).mount();
var rule = output.rule('.vote-pedro');

expect(rule.hasProp('position')).to.be.true;
```
