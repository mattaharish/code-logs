const getContent = require('./file2.js');

const fs = require('fs');
fs.readFileSync = () => {
  return 'Matta';
};

const content = getContent('retry-currying.js');
console.log(content);
