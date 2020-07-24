const fastRedact = require('fast-redact');

const fauxRequest = {
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

const redact = fastRedact({
  paths: [
    'headers.referer',
    'headers.cookie',
    'body.secret',
    'body.token',
    'headers.token',
    'a.b.c.d.e.token',
  ],
  censor: '***REDACTED***',
});

// const redactResult = redact(fauxRequest);

console.time('redaction');

for (let i = 0; i < 1000000; i++) {
  const redactResult = redact(fauxRequest);
  // console.log(redactResult);
}

console.log(redact(fauxRequest));
console.timeEnd('redaction');
