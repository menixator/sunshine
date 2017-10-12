// Swiped from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round

let math = {};
/**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
function decimalAdjust(type, value, exp) {
  // If the exp is undefined or zero...
  if (typeof exp === "undefined" || +exp === 0) {
    return Math[type](value);
  }
  value = +value;
  exp = +exp;
  // If the value is not a number or the exp is not an integer...
  if (
    value === null ||
    isNaN(value) ||
    !(typeof exp === "number" && exp % 1 === 0)
  ) {
    return NaN;
  }
  // If the value is negative...
  if (value < 0) {
    return -decimalAdjust(type, -value, exp);
  }
  // Shift
  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
  // Shift back
  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

// Decimal round
if (!math.round10) {
  math.round10 = function(value, exp) {
    return decimalAdjust("round", value, exp);
  };
}
// Decimal floor
if (!math.floor10) {
  math.floor10 = function(value, exp) {
    return decimalAdjust("floor", value, exp);
  };
}
// Decimal ceil
if (!math.ceil10) {
  math.ceil10 = function(value, exp) {
    return decimalAdjust("ceil", value, exp);
  };
}


module.exports = math;