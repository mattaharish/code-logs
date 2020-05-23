const pAll = require('p-all');

const resolve = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Matta');
    }, 1000);
  });
};

const reject = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('Shit');
    }, 1000);
  });
};

const createResolvePromises = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(resolve);
  }
  return arr;
};

const createRejectPromises = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(reject);
  }
  return arr;
};

(async () => {
  console.time('Test');
  const p = [...createResolvePromises(), ...createRejectPromises()];
  let x = await pAll(p, {stopOnError: false});
  // let x = await Promise.allSettled(p);
  console.timeEnd('Test');
  console.log(x);
})();
