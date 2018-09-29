'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export stashcore-lib', function() {
    var stashcore = require('../');
    should.exist(stashcore.lib);
    should.exist(stashcore.lib.Transaction);
    should.exist(stashcore.lib.Block);
  });
});
