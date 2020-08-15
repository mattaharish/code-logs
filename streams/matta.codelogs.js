const path = require('path');
const fastifyStatic = require('fastify-static');
const PORT = 9001;

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true,
  ignoreTrailingSlash: true,
});

fastify.setErrorHandler(function (error, request, reply) {
  // Log error
  console.log('****', error);
  if (error.statusCode === 404) reply.send('Custom Not Found...');

  // Send error response
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, '../apps/matta/'),
  prefixAvoidTrailingSlash: true,
  prefix: '/',
});

fastify.get('/dyno/*', (request, reply) => {
  console.log('Matta  >>>', `/${request.params['*']}`);
  try {
    return reply.sendFile(
      `/${request.params['*']}`,
      path.join(__dirname, '../apps/matta/')
    );
  } catch (error) {
    console.log('>>>>>', error);
  }
});

fastify.get('/harish', (request, reply) => {
  reply.send({name: 'Harish'});
});

// Run the server!
fastify.listen(PORT, (err, address) => {
  if (err) throw err;
});
