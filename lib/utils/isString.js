const isString = function(string) {
  return (string && typeof string === 'string' && string !== '');
};

module.exports = isString;
