process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const express = require('express')
const request = require('request')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'benchmark')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('pages/index');
    console.log(req.url)
  })
  // CORS proxy
  .get("/proxy", (req, res) => {
    try {
      // read query parameters
      const forwardUrl = req.query["url"];
    
      // make request to IEX API and forward response
      if (forwardUrl) {
        request(forwardUrl, {
          headers: req.headers
        }).pipe(res);
      } else {
        res.statusCode = 400;
        res.statusMessage = 'missing parameter'
        return res;
      }
    } catch(ex) {
      console.error(ex);
      return res;
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
