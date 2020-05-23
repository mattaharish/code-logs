var knex = require('knex')({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: '',
    password: '',
    database: 'boilerplate',
  },
});

const name = 'boilerplate';

knex.raw(`SELECT current_setting('TIMEZONE');`).then((res) => {
  console.log(res);
});
