const mqParser = require('css-mq-parser');

const data = (media = false, params = false) => {
  if (!media || !params) {
    return false;
  }

  const query = mqParser(params)[0];

  return {
    rule: media.params,
    type: query.type,
    not: query.inverse,
    props: query.expressions,
  }
};

module.exports = {
  data,
};
