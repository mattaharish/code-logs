const http = require('http');

const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  res.send({name: 'Matta'});
});

const PORT = 8080;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`listening http on PORT: ${PORT}`);
});
