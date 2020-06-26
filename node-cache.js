const NodeCache = require('node-cache');
const cache = new NodeCache();

const obj = {CCESS_TOKEN: 'harishmatta'};

const success = cache.set('token', obj, 20);

console.log(success);

setInterval(() => {
  const data = cache.get('token');
  console.log(data);
}, 10000);
