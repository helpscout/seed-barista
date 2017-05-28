require('./setup.mocha');
const barista = require('../index');

const includePaths = [
  'test/e2e/seed-navbar/scss/pack/seed-navbar',
];

global.barista = (o = {}) => {
  const options = Object.assign({}, {
    includePaths,
  }, o);

  return barista(options);
};
