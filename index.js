'use strict';

var assert = require('assert');

module.exports = function joiObjectId(Joi, message) {
  assert(Joi && Joi.object, 'you must pass Joi as an argument');
  if (!message || !(typeof message === 'string')) {
    message = 'valid mongo id';
  }
  return function objectId() {
    return Joi.string().regex(/^[0-9a-fA-F]{24}$/, message);
  };
};
