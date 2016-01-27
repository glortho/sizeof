"use strict";

var ECMA_SIZE = require('./byte_size');
var SIZE_FOR_UNRECOGNIZED_TYPE = 0;

function size(obj) {
  var type = typeof obj;
  if (type === 'string') {
    return obj.length * ECMA_SIZE.STRING;
  }

  if (type === 'boolean') {
    return ECMA_SIZE.BOOLEAN;
  }

  if (type === 'number') {
    return ECMA_SIZE.NUMBER;
  }

  return SIZE_FOR_UNRECOGNIZED_TYPE;
}

var Stats = function () {
  this.keys = [];
  this.values = [];
};

Stats.prototype.addKey = function(key) {
  this.keys.push(key);
};

Stats.prototype.addKeyValue = function(key, value) {
  this.keys.push(key);
  this.values.push(value);
};

Stats.prototype.print = function() {
  console.log('---\nkeys:\t', this.keys);
  console.log('values:\t', this.values, '\n---');
};

// bytes are calculated using:
// http://bclary.com/2004/11/07/
Stats.prototype.calculateBytes = function() {

  var all = this.keys.concat(this.values);

  var map = all.map(function(x) {
    return size(x);
  });

  return map.reduce(function(x, y) {
    return x + y;
  }, 0);

};

exports.Stats = Stats;
