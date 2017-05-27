# .at()

#### .at(mediaQuery)

| Argument | Type | Description |
| --- | --- | --- |
| mediaQuery | string / array | The media query to find the CSS rule. |


#### Returns

| Type | Description |
| --- | --- |
| object | Barista Rule instance described in the media query. `false` if no Rule available. |



## Usage

Let's pretend the following is our CSS rule:

```scss
@media tv (min-width: 480px) and (max-width: 960px) and (orientation: landscape) {
  .vote-pedro { ... }
}
@media (min-width: 600px) {
  .pedro--medieval-warrior { ... }
}
```

### Array

Passing media query as an `array` is the easiest way to find your rule.

The values in the `array` work like keywords. The Rule that is returned is the first one to match all of your specified keywords.

```js
var output = barista({ ... }).mount();
var rule = output.rule('.vote-pedro').at(['min', '480px']);

expect(rule.prop('position')).to.equal('absolute');
```

Although the following example does work, it is best to **avoid** being overly vague with your `.at([])` keywords.

```js
var output = barista({ ... }).mount();
var rule = output.rule('.vote-pedro').at(['4']); // 4 what?! Vote 4 Pedro perhaps?

expect(rule.prop('position')).to.equal('absolute');
```


### String

Passing media query as a `string` allows you to be more specific with your search.

You may omitted parentheses from your `string`. However it must match the **entire** media query. If you have a longer media query, try using an `array` instead.

```js
var output = barista({ ... }).mount();
var rule = output.rule('.pedro--medieval-warrior').at('min-width: 600px');

expect(rule.prop('display')).to.equal('block');
```
