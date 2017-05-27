# .prop()

#### .prop(property)

| Argument | Type | Description |
| --- | --- | --- |
| property | string | The CSS property to retrieve. |


#### Returns

| Type | Description |
| --- | --- |
| string | The CSS property retrieved. `false` is property doesn't exist. |


#### Aliases

* `css()`



## Examples


```js
var output = barista({ ... }).mount();
var rule = output.find('.vote-pedro');

expect(rule.prop('position')).to.equal('absolute');
```
