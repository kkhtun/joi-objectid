'use strict';

var assert = require('assert');

module.exports = function joiObjectId(Joi, message) {
  assert(Joi && Joi.object, 'you must pass Joi as an argument');
  if (!message || !(typeof message === 'string')) {
    message = 'valid mongo id';
  }

  var getErrorMessage = (value) => `Provided value "${String(value)}" 
    fails to match the ${message} pattern`;

  var objectIdHexSchema = Joi.string().custom((value, helper) => {
    return new RegExp(/^[0-9a-fA-F]{24}$/).test(value) ?
      value : 
      helper.message(getErrorMessage(value));
  });

  return function objectId() {
    return Joi.alternatives(
      objectIdHexSchema,
      Joi.object().custom((value, helper) => {
        if (value._bsontype !== "ObjectId")
          return helper.message(getErrorMessage(value));
        return objectIdHexSchema.validate(value.toString()).error ? 
          helper.message(getErrorMessage(value)) : 
          value;
      })
    );
  };
}

