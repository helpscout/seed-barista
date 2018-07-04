// Test :: Mixin :: Max
/* globals describe: true, it: true */
'use strict';

describe('seed-breakpoints: mixin: max', function() {
  it('should accept breakpoint sizes (defined in _config.scss)', function() {
    var style = `
      @import "./_index";
      .machi {
        @include breakpoint-max(lg) {
          position: absolute;
        }
      }
    `;
    var output = barista({ content: style });
    var rule = output.rule('.machi');
    var mq = rule.mq();

    expect(rule.exists()).to.be.true;
    expect(mq.rule).to.include('max-width: 99');
    expect(mq.rule).to.not.include('min');
    expect(mq.props.length).to.equal(1);
  });

  it('should accept numerical sizes (e.g. px)', function() {
    var style = `
      @import "./_index";
      .machi {
        @include breakpoint-max(80em) {
          position: absolute;
        }
      }
    `;
    var output = barista({ content: style });
    var rule = output.rule('.machi');
    var mq = rule.mq();


    expect(rule.exists()).to.be.true;
    expect(mq.rule).to.include('max-width: 80em');
    expect(mq.rule).to.not.include('min');
    expect(mq.props.length).to.equal(1);
  });
});
