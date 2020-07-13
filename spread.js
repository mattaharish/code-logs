const obj1 = {
  name: 'Matta',
  age: '23',
};

const obj2 = {
  name: 'Kumar',
  age: '23',
};

function a(func) {
  return (...params) => {
    console.log(params);
    const x = func(...params);
    console.log(x);
  };
}

const func = (param1, param2) => {
  console.log(param1, param2);
  return 'Matta';
};

a(func)(obj1, obj2);

a(func)(obj1);
