const {last} = require('lodash');
class CodeError extends Error {
  constructor() {
    super();
    this.name = 'Code Error';
  }
}

class NotFound extends CodeError {
  constructor(code, message, description, ssf) {
    super();
    Error.captureStackTrace(this, ssf);
    this.message = message;
    this.code = code;
    this.number = 101;
    this.description = description;
    this.fileName = last(this.stack.split('\n')[1].split(' '));
    this.lineNumber = last(this.stack.split('\n')[1].split(' ')).split(':')[1];
    this.columnNumber = last(this.stack.split('\n')[1].split(' ')).split(
      ':'
    )[2];
  }
}

const bun = () => {
  const numbers = [1, 3, 5];
  if (!numbers.includes(4))
    return Promise.reject(
      new NotFound(
        404,
        'Number not found',
        "couldn't find the number in array",
        bun
      )
    );
};

(async () => {
  try {
    await bun();
  } catch (err) {
    console.log('Instance of NotFound error? : ', err instanceof NotFound);
    // console.log('Message:', err.message);
    // console.log('Name: ', err.name);
    // console.log('Number: ', err.number);
    // console.log('Description: ', err.description);
    // console.log('Stack: ', err.stack);
    // console.log('fileName: ', err.fileName);
    // console.log('columnNumber: ', err.columnNumber);
    // console.log('lineNumber: ', err.lineNumber);
    // console.log('To String: ', err.toString());
    console.log(err);
  }
})();
