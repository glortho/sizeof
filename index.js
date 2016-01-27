// Copyright 2014 Andrei Karpushonak

"use strict";

var Stats       = require('./stats').Stats;
var ECMA_SIZES  = require('./byte_size');

/**
 * Collect all the keys/values of the object
 * Handles nested objects via recursion
 * @param object  - object to analyze
 * @param stats   - helper object to collect all the keys/values
 * @returns {*}
 */
var collectKeysValues = function (object, stats) {

  for(var prop in object) {
    if(object.hasOwnProperty(prop)) {
      if (typeof object[prop] === 'object') {
        // this key is a reference, count the key and proceed with the referenced value
        stats.addKey(prop);
        collectKeysValues(object[prop], stats);
      } else {
        stats.addKeyValue(prop, object[prop]);
      }
    }
  }

  return object;

};

/**
 * Main module's entry point
 * Calculates Bytes for the provided parameter
 * @param object - handles object/string/boolean/buffer
 * @returns {*}
 */
function sizeof(object) {

  var bytes = 0;
  var type = typeof object;

  if (type === 'object') {
    if (Buffer.isBuffer(object)) {
      bytes = object.length;
    }
    else {
      var stats = new Stats();
      collectKeysValues(object, stats);
      // calculate size in Bytes based on ECMAScript Language Specs
      bytes = stats.calculateBytes();
    }
  } else if (type === 'string') {
    bytes = object.length * ECMA_SIZES.STRING;
  } else if (type === 'boolean') {
    bytes = ECMA_SIZES.BOOLEAN;
  } else if (type === 'number') {
    bytes = ECMA_SIZES.NUMBER;
  }
  return bytes;
}

module.exports = sizeof;
