/**
 * * How many times the action needs to be retried?
 * * Which action needs to be retried?
 * * What are the params, required by the action?
 * * Is there any timeout to stop the action?
 *
 */

const rp = require('request-promise');
const retry = require('async-retry');

const action = (param) => {
  return rp({
    method: 'GET',
    uri: `https://jsonplaceholder.typicode.com/todos/${param}`,
    json: true,
  });
};

const retryNTimes = (retryCount, timeout) => (action) => async (
  actionParams
) => {
  const result = await retry(
    async (bail, retryAttempt) => {
      console.log(`...Trying... Attempt - #${retryAttempt}`);
      const result = await action(actionParams);
      return result;
    },
    {
      retries: retryCount,
      minTimeout: timeout,
    }
  );
  return result;
};

const catchable = (retryableAction) => async (actionParams) => {
  try {
    const value = await retryableAction(actionParams);
    return {value};
  } catch (err) {
    throw err;
  }
};

catchable(retryNTimes(2, 100)(action))(1)
  .then((res) => {
    const {value} = res;
    console.log(value);
  })
  .catch((err) => {
    console.log('Error Status Code', err.statusCode);
  });
