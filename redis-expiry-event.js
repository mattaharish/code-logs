const {promisify} = require('util');
const {v4: uuid} = require('uuid');
const redis = require('redis');

const client = redis.createClient();
const subscriber = redis.createClient();

const setExAsync = promisify(client.setex).bind(client);
/**
 * * Configure the redis client to emit events on expiry
 */
subscriber.config('set', 'notify-keyspace-events', 'Ex');

/**
 * * Subscribe to expired events
 */
subscriber.subscribe('__keyevent@0__:expired');

const handleExpiredEvents = (_channel, message) => {
  console.log(message);
};

subscriber.on('message', handleExpiredEvents);

(async () => {
  try {
    const cached = await setExAsync(`test-expiry - ${uuid()}`, 5, `expired!!`);
    console.log(cached);
  } catch (error) {
    console.log(error);
  }
})();
