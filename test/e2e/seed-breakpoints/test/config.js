// Test :: Config
/* globals describe: true, it: true */
'use strict';

describe('seed-breakpoints: config', function() {
  var style = `
    $seed-breakpoints: (
      zero: 0,
      two: 200px,
      nine: 900px,
    );
    @import "./_index";
    .machi {
      @include breakpoint-all() {
        position: absolute;
      }
      @include breakpoint-min(two) {
        color: blue;
      }
      @include breakpoint-max(nine) {
        color: red;
      }
    }
  `;
  var output = barista({ content: style });

  it('should generate rules based on custom breakpoint sizes', function() {
    var rule = output.rule('.machi');
    var mq = rule.mq();

    expect(rule.exists()).to.be.true;
    // Default sizes
    expect(output.rule('.machi@sm').exists()).to.be.false;
    expect(output.rule('.machi@md').exists()).to.be.false;
    expect(output.rule('.machi@lg').exists()).to.be.false;
    // Custom sizes
    expect(output.rule('.machi@zero').exists()).to.be.false;
    expect(output.rule('.machi@two').exists()).to.be.true;
    expect(output.rule('.machi@nine').exists()).to.be.true;
    expect(output.rule('.machi@nine').mq().rule).to.include('min-width: 900px');
  });
});
