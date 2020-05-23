const tesseract = require('tesseract.js');

const config = {
  // lang: 'eng',
  // oem: 1,
  // psm: 3
};

tesseract
  .recognize('./image.jpg', config)
  .then(data => {
    console.log('Result:', data.text);
  })
  .catch(error => {
    console.log(error.message);
  });
