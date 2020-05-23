var request = require('request');
// request('http://localhost:8888/test', (error, response, body) => {
//   console.log('error:', error); // Print the error if one occurred
//   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//   console.log('body:', body); // Print the HTML for the Google homepage.
// });

request(
  {
    headers: {
      'Content-Type': 'application/gzip'
    },
    uri: 'http://localhost:8888/test',
    method: 'GET'
  },
  function(err, res, body) {
    console.log(res.headers);
    console.log(body);
    //it works!
  }
);
