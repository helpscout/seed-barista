// Test :: Mixin :: Between
/* globals describe: true, it: true */
'use strict';

describe('seed-breakpoints: mixin: between', function() {
  it('should accept breakpoint sizes (defined in _config.scss)', function() {
    var style = `
      @import "./_index";
      .machi {
        @include breakpoint-between(sm, lg) {
          position: absolute;
        }
      }
    `;
    var output = barista({ content: style });
    var rule = output.rule('.machi');
    var mq = rule.mq();

    expect(rule.exists()).to.be.true;
    expect(mq.rule).to.include('min-width: 544');
    expect(mq.rule).to.include('max-width: 991');
  });

  it('should accept numerical sizes (e.g. px)', function() {
    var style = `
      @import "./_index";
      .machi {
        @include breakpoint-between(400px, 80em) {
          position: absolute;
        }
      }
    `;
    var output = barista({ content: style });
    var rule = output.rule('.machi');
    var mq = rule.mq();

    expect(rule.exists()).to.be.true;
    expect(mq.rule).to.include('min-width: 400px');
    expect(mq.rule).to.include('max-width: 80em');
  });
});
