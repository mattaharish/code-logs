const _ = require('lodash');
const {v4: uuid} = require('uuid');

const resolvePromise = () => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve({id: uuid()});
    }, 1000);
  });
};

const rejectPromises = () => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject({id: uuid()});
    }, 2000);
  });
};

const fathomPromises = Array(5)
  .fill(0)
  .map((_val) => resolvePromise());

const flotsamPromises = Array(2)
  .fill(0)
  .map((_val) => rejectPromises());

(async () => {
  const data = await Promise.allSettled([
    ...fathomPromises,
    ...flotsamPromises,
  ]);

  const groupedByStatus = _.groupBy(data, 'status');

  const settledGroups = _.mapValues(groupedByStatus, (group) =>
    group.map((settled) => settled.value || settled.reason)
  );

  console.log(settledGroups);
})();
