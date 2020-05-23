const pino = require('pino');
const logger = pino({
  level: 'trace',
  name: 'Test-Logger',
  base: null,
});

// { fatal: 60, error: 50, warn: 40, info: 30, debug: 20, trace: 10 }

logger.trace('This is TRACE');
logger.debug('This is DEBUG');
logger.info('This is INFO');
logger.warn('This is WARN');
logger.error('This is ERROR');
logger.fatal('This is FATAL');
// logger.verbose('This is VERBOSE');
