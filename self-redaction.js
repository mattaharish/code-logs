const {serialize, deserialize} = require('v8');

const request = {
  headers: {
    host: 'http://example.com',
    cookie: `oh oh we don't want this exposed in logs in etc.`,
    referer: `if we're cool maybe we'll even redact this`,
    token: 'token123',
  },
  body: {
    token: 'token123',
  },
  a: {
    b: {
      c: {
        d: {
          e: {
            token: 'Matta',
          },
        },
      },
    },
  },
};

const censor = '***REDACTED***';

const arrayRedactor = (data) => {
  const redactKeys = ['referer', 'cookie', 'secret', 'token'];
  const replacer = (key, value) => {
    if (redactKeys.includes(key)) {
      return censor;
    }
    return value;
  };
  return JSON.stringify(data, replacer);
};

const regexRedactor = (data) => {
  const redactRegexes = [/referer$/i, /cookie$/i, /secret$/i, /token$/i];
  const shouldRedact = (key) =>
    redactRegexes.reduce(
      (doesMatch, currentPattern) => doesMatch || key.match(currentPattern),
      false
    );
  const replacer = (key, value) => {
    if (shouldRedact(key, value)) return censor;
    return value;
  };

  return JSON.stringify(data, replacer);
};

const start = () => {
  console.time('redaction');

  for (let i = 0; i < 1000000; i++) {
    arrayRedactor(request);
    // regexRedactor(request);
    // console.log(redactResult);
  }

  console.log(typeof arrayRedactor(request));
  console.log(arrayRedactor(request));

  console.timeEnd('redaction');
};

start();

// const deepCopyV8 = (data) => deserialize(serialize(data));

// const deepCopyJSON = (data) => JSON.parse(JSON.stringify(data));

// const copied = deepCopyJSON(request);

// const v8Copied = deepCopyV8(request);

// copied.headers = {};
// copied.body = {};

// v8Copied.headers = {};
// v8Copied.body = 'Matta';

// console.log(request);
// console.log(copied);
// console.log(v8Copied);

// const perfV8 = (data) => deepCopyV8(data);

// const perfJson = (data) => deepCopyJSON(data);

// const loop = 100000;

// console.time(`${loop} - v8`);
// for (let i = 0; i < loop; i++) {
// const copied = perfV8(request);
// perfV8(request);
// perfJson(request);
// const copied = perfJson(request);
// console.log(copied);
// }
// console.timeEnd(`${loop} - v8`);
