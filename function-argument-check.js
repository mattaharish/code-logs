const f1 = (...params) => {
  console.log(params);
  const a = {email: 'harish', password: 'matta'};
  console.log(a);
  f2(...params);
};

const f2 = (a, b) => {
  console.log(a, b);
};

f1(1, 2, 3, 4);
