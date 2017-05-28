require('./setup.mocha');
const barista = require('../index');

const includePaths = [
  'test/e2e/seed-breakpoints/scss/pack/seed-breakpoints',
];

global.barista = (o) => {
  const options = Object.assign({}, {
    includePaths,
  }, o);

  return barista(options);
};
