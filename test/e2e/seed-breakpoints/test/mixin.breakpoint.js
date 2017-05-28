// Test :: Mixin :: Breakpoint
/* globals describe: true, it: true */
'use strict';

describe('seed-breakpoints: mixin: breakpoint', function() {
  it('should accept breakpoint sizes (defined in _config.scss)', function() {
    var style = `
      @import "./_index";
      .machi {
        @include breakpoint(sm) {
          position: absolute;
        }
      }
    `;
    var output = barista({ content: style });
    var rule = output.rule('.machi');
    var mq = rule.mq();

    expect(rule.exists()).to.be.true;
    expect(mq.rule).to.include('min-width: 544');
  });

  it('should accept numerical sizes (e.g. px)', function() {
    var style = `
      @import "./_index";
      .machi-px {
        @include breakpoint(500px) {
          position: absolute;
        }
      }
      .machi-em {
        @include breakpoint(48em) {
          position: absolute;
        }
      }
      .machi-rem {
        @include breakpoint(48rem) {
          position: absolute;
        }
      }
    `;
    var output = barista({ content: style });

    expect(output.rule('.machi-px').mq().rule).to.include('min-width: 500px');
    expect(output.rule('.machi-em').mq().rule).to.include('min-width: 48em');
    expect(output.rule('.machi-rem').mq().rule).to.include('min-width: 48rem');
  });

  it('should only have a min-width rule (mobile-first)', function() {
    var style = `
      @import "./_index";
      .machi {
        @include breakpoint(sm) {
          position: absolute;
        }
      }
    `;
    var output = barista({ content: style });
    var rule = output.rule('.machi');
    var mq = rule.mq();

    expect(rule.exists()).to.be.true;
    expect(mq.rule).to.include('min-width: 544');
    expect(mq.rule).to.not.include('max');
    expect(mq.rule).to.not.include('height');
    expect(mq.props.length).to.equal(1);
  });
});
