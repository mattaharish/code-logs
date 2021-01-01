// 0 -1000 -> 100
// 1000 - 2000 -> 200
// 2000 -5000 ->   500
// 5000 -10000 -> 1000
// 10000 -20000 -> 2000
// 20000 -50000 -> 5000
// 50000 - 100000 -> 10000
// 100000 - 200000 -> 20000
// 200000 - 500000 -> 50000
// 500000 - 1000000 -> 100000
// 1000000 - 2000000 -> 200000
// 2000000 - 15000000 -> 500000

const checkForBucket = (price) => {
  if (price > 1 && price <= 1000) return 100;
  if (price > 1000 && price <= 2000) return 200;
  if (price > 2000 && price <= 5000) return 500;
  if (price > 5000 && price <= 10000) return 1000;
  if (price > 10000 && price <= 20000) return 2000;
  if (price > 20000 && price <= 50000) return 5000;
  if (price > 50000 && price <= 100000) return 10000;
  if (price > 100000 && price <= 200000) return 20000;
  if (price > 200000 && price <= 500000) return 20000;
  if (price > 500000 && price <= 1000000) return 100000;
  if (price > 1000000 && price <= 2000000) return 200000;
  if (price > 2000000 && price <= 15000000) return 500000;
};

const stepper = (price, step) => {
  const mod = price % step;
  console.log(mod);
  console.log(mod / step);
  return price - mod + Math.round(mod / step) * step;
};

(function () {
  const price = 27501;
  const step = checkForBucket(price);
  console.log(stepper(price, step));
})();
