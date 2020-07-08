const logger = require('pino')({
  redact: [
    'key',
    'path.to.key',
    'stuff.thats[*].secret',
    'stuff.thats[*].access_token',
    'access_token',
    'refresh_token',
    'client_id',
    'client_secret',
    'cookie',
    'referer',
    'headers.cookie',
    'test.name',
  ],
});

const fauxRequestData = {
  access_token: 'will be redacted',
  path: {
    to: {key: 'sensitive', another: 'thing'},
  },
  stuff: {
    thats: [
      {access_token: 'will be redacted', logme: 'will be logged'},
      {secret: 'as will this', logme: 'as will this'},
    ],
  },
};

const fauxRequestWithHeaders = {
  headers: {
    host: 'http://example.com',
    cookie: `oh oh we don't want this exposed in logs in etc.`,
    referer: `if we're cool maybe we'll even redact this`,
  },
};

const fauxRequest = {
  host: 'http://example.com',
  cookie: `oh oh we don't want this exposed in logs in etc.`,
  referer: `if we're cool maybe we'll even redact this`,
};

logger.info(fauxRequest.headers);

logger.info(fauxRequest.cookie);

logger.info(fauxRequestWithHeaders);

logger.info(fauxRequestData);
