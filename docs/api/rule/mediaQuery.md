# .mediaQuery()

**Alias: `.mq()`**

#### Returns

| Type | Description |
| --- | --- |
| object | Data describing the media query. `false` if no media query available. |


#### Data object

We have a `.vote-pedro` class with various media queries:

```scss
@media tv (min-width: 480px) and (max-width: 960px) and (orientation: landscape) {
  .vote-pedro { ... }
}
```

The result of `output.rule('.vote-pedro').mq()` will be:

```js
{
  rule: '@media tv (min-width: 480px) and (max-width: 960px) and (orientation: landscape)',
  type: 'tv',
  not: false,
  props: [
    {
      modifier: 'min',
      feature: 'width',
      value: '480px'
    },
    {
      modifier: 'max',
      feature: 'width',
      value: '960px'
    },
    {
      modifier: undefined,
      feature: 'orientation',
      value: 'landscape'
    },
  ]
}
```


**Note:** `.mq()` works for parsing simpler media queries typically seen in web/mobile use. It may not be able to parse complicated media queries with a combination of nested comma separated rules.


## Examples


```js
var output = barista({ ... }).mount();
var rule = output.rule('.vote-pedro');
var mq = rule.mq();

expect(mq.type).to.equal('tv');
expect(mq.props[0].modifier).to.contain('min');
expect(mq.props[0].value).to.contain('480');
```
