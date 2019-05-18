function validate(param) {
  if (!isNaN(param)) return false;

  let hasInvalid = param.toLowerCase().includes('invalid');

  return hasInvalid;
}

module.exports = function(value, unit) {
  if (validate(value) && validate(unit)) {
    return { error: 'Invalid value and unit' };
  }
  if (validate(value)) {
    return { error: 'Invalid value' };
  }
  if (validate(unit)) {
    return { error: 'Invalid unit' };
  }

  return false;
};
