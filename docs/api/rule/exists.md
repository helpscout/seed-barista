# .exists()


#### Returns

| Type | Description |
| --- | --- |
| boolean | `true`/`false` whether or not the CSS rule exists. |



## Examples


```js
var output = barista({ ... }).mount();
var rule = output.rule('.vote-pedro');

expect(rule.exists()).to.be.true;
```
