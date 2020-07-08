const fastRedact = require('fast-redact');

const fauxRequest = {
  headers: {
    host: 'http://example.com',
    cookie: `oh oh we don't want this exposed in logs in etc.`,
    referer: `if we're cool maybe we'll even redact this`,
  },
};

const redact = fastRedact({
  paths: ['referer', 'headers.cookie', 'body.secret'],
  censor: '***REDACTED***',
});

const redactResult = redact(fauxRequest);

console.log(redactResult);
