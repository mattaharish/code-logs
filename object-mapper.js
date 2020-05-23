const om = require('object-mapper');

const input = [
  {
    a: 1,
    b: 2,
  },
  {
    a: 5,
    b: 7,
  },
];

const outputMapper = {
  a: 'x',
  b: 'y',
};

const output = om(input, outputMapper);

console.log(output);
