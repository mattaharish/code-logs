const rp = require('request-promise');
const nock = require('nock');

nock('https://jsonplaceholder.typicode.com')
  .get('/todos/1')
  .reply(200, 'Happy');

nock('https://jsonplaceholder.typicode.com').get('/todos/1').reply(200, 'Sad');

const action = async (param = 1) => {
  const data = await rp({
    method: 'GET',
    uri: `https://jsonplaceholder.typicode.com/todos/${param}`,
    json: true,
  });
  console.log(data);
  return data;
};

describe('Test', () => {
  it('should return a 200 when login is successful ', async () => {
    const response = await action();
    console.log(response);
  });

  it('should return a 200 when login is successful ', async () => {
    const response = await action();
    console.log(response);
  });

  it('should return a 200 when login is successful ', async () => {
    const response = await action();
    console.log(response);
  });
});
