const fs = require('fs');
const https = require('https');
const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.cert', 'utf8');

const credentials = {key: privateKey, cert: certificate};
const express = require('express');
const app = express();
const PORT = 8443;

app.get('/', async (req, res) => {
  res.send({name: 'Matta'});
});

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
  console.log(`listening https : ${PORT}`);
});
