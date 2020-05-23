'use strict';

const autocannon = require('autocannon');

const data = require('./data.json');

console.log(data);
function startBench() {
  const url = 'http://127.0.0.1:3000/';
  const instance = autocannon(
    {
      url: url,
      connections: 1000,
      duration: 10,
      method: 'POST', // this should be a post for logging in
      body: JSON.stringify(data),
    },
    finishedBench
  );

  instance.on('reqError', (err) => {
    console.log(err);
  });

  autocannon.track(instance);

  function finishedBench(err, res) {
    console.log('finished bench', err, res);
  }
}
startBench();
