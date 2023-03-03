const fs = require('fs')
const express = require('express')
const https = require('https')

const app = express();
const key = fs.readFileSync('./cert/key.pem')
const cert = fs.readFileSync('./cert/cert.pem')
const server = https.createServer({key, cert}, app)
const PORT = 3000;

app.get('/get-cookie', (req, res) => {
  res.set({
    // These first 2 headers allow cross-site cookie to work
    'Access-Control-Allow-Origin': 'https://localhost:3001', // must point to the requesting address
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, POST',
  })
  res.cookie('rm_security_dashboard', 'xxx', {
    maxAge: 3600000, // milliseconds
    path: '/',
    domain: "localhost",
    secure: true,
  })
  res.send('cookie is set');
})

server.listen(PORT, () => {
  console.log(`App started at port ${PORT}`);
})
