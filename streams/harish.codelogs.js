const http = require('http');

const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  console.log('Came Request....');
  res.send({name: 'Harish'});
});

const PORT = 9002;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`listening http on PORT: ${PORT}`);
});
