// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// alias http://kubernetes.docker.internal:3000/
// const fs = require('fs');
const express = require('express')
// const https = require('https')
const http = require('http')
const request = require('request')

const app = express();

app.use(express.static('benchmark'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// CORS proxy
app.get("/proxy", (req, res) => {
  // read query parameters
  const forwardUrl = req.query["url"];

  // make request to IEX API and forward response
  request(forwardUrl, {
    headers: req.headers
  }).pipe(res);
});




http.createServer(app).listen(80)
// https.createServer({
//   key: fs.readFileSync("certs/key.pem"),
//   cert: fs.readFileSync("certs/cert.pem"),
// }, app).listen(443)
