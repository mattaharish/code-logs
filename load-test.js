const http = require('http');

const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  // console.log('Incoming Request....');
  setTimeout(() => {
    res.send({ name: 'Harish' });
  }, 1000);
});

const PORT = 3000;

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`listening http on PORT: ${PORT}`);
});
