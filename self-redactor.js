const _ = require('lodash');
const stringify = require('json-stringify-safe');

const redactionRegexes = [
  /cookie$/i,
  /referer/i,
  /email/i,
  /x-api-key/i,
  /X-rhsRef/i,
  /securityCode/i,
];

function shouldRedact(key, value) {
  const shouldRedact = redactionRegexes.reduce(
    (doesMatch, currentPattern) =>
      doesMatch || (key.match(currentPattern) && typeof value === 'string'),
    false
  );
  return shouldRedact;
}

function circularAuthorizationReplacer() {
  return (key, value) => {
    if (shouldRedact(key, value)) return '***REDACTED***';
    else if (typeof value === 'bigint') return Number(value);
    return value;
  };
}

const parser = (replacer) => (o) =>
  !_.isEmpty(o) ? JSON.parse(stringify(o, replacer)) : o;

const circularRedactingParse = parser(circularAuthorizationReplacer());

const fauxRequest = {
  headers: {
    host: 'http://example.com',
    cookie: `oh oh we don't want this exposed in logs in etc.`,
    referer: `if we're cool maybe we'll even redact this`,
  },
};

console.log(circularRedactingParse(fauxRequest));

console.log(fauxRequest);
