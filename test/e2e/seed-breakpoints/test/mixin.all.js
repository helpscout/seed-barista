// Test :: Mixin :: All
/* globals describe: true, it: true */
'use strict';

describe('seed-breakpoints: mixin: all', function() {
  var style = `
    @import "./_index";
    .machi {
      @include breakpoint-all() {
        position: absolute;
      }
    }
  `;
  var output = barista({ content: style });

  it('should generate rule for all breakpoints', function() {
    var sm = output.rule('.machi@sm');

    expect(output.rule('.machi').exists()).to.be.true;
    expect(output.rule('.machi@sm').exists()).to.be.true;
    expect(output.rule('.machi@md').exists()).to.be.true;
    expect(output.rule('.machi@lg').exists()).to.be.true;
    expect(sm.mq().rule).to.include('min-width');
  });
});
