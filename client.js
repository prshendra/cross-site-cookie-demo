const fs = require('fs')
const express = require('express')
const https = require('https')
const path = require('path')

const app = express();
const key = fs.readFileSync('./cert/key.pem')
const cert = fs.readFileSync('./cert/cert.pem')
const server = https.createServer({key, cert}, app)

const PORT = 3001

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/views/index.html'))
})

server.listen(PORT, () => {
  console.log(`App started at port ${PORT}`);
})
