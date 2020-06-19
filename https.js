const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.cert', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  res.send({name: 'Matta'});
});
// your express configuration here

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

// httpServer.listen(8080, () => {
//   console.log('listening http');
// });
httpsServer.listen(8443, () => {
  console.log('listening https');
});

const x = [1, 23, 4];
x.map((x) => x);
