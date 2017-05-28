const options = (o = {}) => {
  if (!o || typeof o !== 'object') {
    return false;
  }
  if (!o.file && !o.content) {
    return false;
  }
  // options.file must be a string
  if (o.file !== undefined && typeof o.file !== 'string') {
    return false;
  }
  // options.content must be a string
  if (o.content !== undefined && typeof o.content !== 'string') {
    return false;
  }
  // options.src must be a string
  if (o.src !== undefined && typeof o.src !== 'string') {
    return false;
  }

  return true;
};

module.exports = {
  options,
};
