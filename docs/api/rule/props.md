# .props()

#### Returns

| Type | Description |
| --- | --- |
| array | Returns an array all the CSS properties of a rule. |


```js
var rule = output.rule('.vote-pedro');
var prop = rule.props();

// [{ prop: 'color', value: 'red' }]
```


#### Aliases

* `getProps()`



## Examples


```js
var output = barista({ ... });
var rule = output.rule('.vote-pedro');
var props = rule.props();

expect(props.length).to.equal(1);
expect(props[0].prop).to.equal('color');
expect(props[0].value).to.equal('red');
```
