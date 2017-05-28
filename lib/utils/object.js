const hasProp = (o = {}, prop = '') => {
  return Object.prototype.hasOwnProperty.call(o, prop);
};

module.exports = {
  hasProp,
};
