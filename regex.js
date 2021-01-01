const isUsernameInPwd = (name, password) => {
  console.log(name.match(/.{4}/g));
  console.log(name.substring(1).match(/.{4}/g));
  console.log(name.substring(2).match(/.{4}/g));
  console.log(name.substring(3).match(/.{4}/g));

  const partsOfFourLetters = name
    .match(/.{4}/g)
    .concat(
      name.substr(1).match(/.{4}/g),
      name.substr(2).match(/.{4}/g),
      name.substr(3).match(/.{4}/g)
    );

  console.log(partsOfFourLetters);
  return new RegExp(partsOfFourLetters.join('|'), 'i').test(password);
};

console.log(isUsernameInPwd('matta@gmail.com', 'Mat@123'));
