'use strict';

var createError = require('errno').create;

var StashcoreNodeError = createError('StashcoreNodeError');

var RPCError = createError('RPCError', StashcoreNodeError);

module.exports = {
  Error: StashcoreNodeError,
  RPCError: RPCError
};
