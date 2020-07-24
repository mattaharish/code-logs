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
  'data.userName.lastName1': 'x',
  'data.userName.lastName2': 'y',
  a: 'z',
};

const output = om(input, outputMapper);

console.log(output);
