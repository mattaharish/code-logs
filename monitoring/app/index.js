// Require the framework and instantiate it
const fastify = require('fastify')({logger: true});
const metricsPlugin = require('fastify-metrics');

fastify.register(metricsPlugin, {endpoint: '/metrics'});

// Declare a route
fastify.get('/', async (request, reply) => {
  return {hello: 'world'};
});

fastify.get('/bad', async (request, reply) => {
  setTimeout(() => {
    reply.code(500).send({success: false});
  }, 5000);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({port: 3000, host: '0.0.0.0'});
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
