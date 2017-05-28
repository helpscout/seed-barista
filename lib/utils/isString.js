const isString = function(string) {
  if (string && typeof string === 'string' && string !== '') {
    return true;
  } else {
    return false;
  }
};

module.exports = isString;
