const mqParser = require('css-mq-parser');
const isNestedRule = require('./cssom').isNestedRule;
const isString = require('./isString');

const data = (media, params) => {
  if (!isNestedRule(media) || !isString(params)) {
    return false;
  }
  const query = mqParser(params)[0];

  return {
    rule: params,
    type: query.type,
    not: query.inverse,
    props: query.expressions,
  }
};

module.exports = {
  data,
};
