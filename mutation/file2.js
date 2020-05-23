const fs = require('fs');
const path = require('path');

module.exports = (filename) => {
  const content = fs.readFileSync(path.resolve(__dirname, `../${filename}`));
  return content;
};
