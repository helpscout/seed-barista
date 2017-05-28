// Test :: Build
/* globals describe: true, it: true */
'use strict';

describe('seed-breakpoints: build', function() {
  var style = `
    @import "./_index";
  `;
  var output = barista({ content: style });

  it('should build', function() {
    expect(output).to.exist;
  });

  it('should not export any rules', function() {
    expect(output.css.length).to.equal(0);
  });
});
