// Test :: Mixin :: Prop Map
/* globals describe: true, it: true */
'use strict';

describe('seed-breakpoints: mixin: prop-map', function() {
  it('should generate rule for all breakpoints with modifier', function() {
    var style = `
      @import "./_index";
      $styles: (
        giraffe: (
          color: yellow,
        ),
        mz: (
          color: red,
        ),
        trot: (
          color: blue,
        ),
      );
      .machi {
        // Modifiers
        &- {
          @include breakpoint-prop-map($styles, (color)) {
            color: prop(color);
          }
        }
      }
    `;
    var output = barista({ content: style });

    // Generated styles
    expect(output.rule('.machi--giraffe').exists()).to.be.true;
    expect(output.rule('.machi--mz').exists()).to.be.true;
    expect(output.rule('.machi--trot').exists()).to.be.true;
    expect(output.rule('.machi--giraffe@sm').exists()).to.be.true;
    expect(output.rule('.machi--mz@sm').exists()).to.be.true;
    expect(output.rule('.machi--trot@sm').exists()).to.be.true;
    expect(output.rule('.machi--giraffe@sm').exists()).to.be.true;
    expect(output.rule('.machi--giraffe@md').exists()).to.be.true;
    expect(output.rule('.machi--mz@md').exists()).to.be.true;
    expect(output.rule('.machi--trot@md').exists()).to.be.true;
    expect(output.rule('.machi--giraffe@lg').exists()).to.be.true;
    expect(output.rule('.machi--mz@lg').exists()).to.be.true;
    expect(output.rule('.machi--trot@lg').exists()).to.be.true;
    // Props
    expect(output.rule('.machi--giraffe').prop('color')).to.equal('yellow');
    expect(output.rule('.machi--giraffe@sm').prop('color')).to.equal('yellow');
    expect(output.rule('.machi--giraffe@md').prop('color')).to.equal('yellow');
    expect(output.rule('.machi--giraffe@lg').prop('color')).to.equal('yellow');
    // Media query
    expect(output.rule('.machi--giraffe').mq()).to.be.false;
    expect(output.rule('.machi--giraffe@sm').mq()).to.not.be.false;
    expect(output.rule('.machi--giraffe@md').mq()).to.not.be.false;
    expect(output.rule('.machi--giraffe@lg').mq()).to.not.be.false;
  });
});
