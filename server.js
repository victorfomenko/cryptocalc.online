const express = require('express');

const { parse } = require('url');
const next = require('next');
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.SERVER_PORT || 3000
const app = next({ dir: './src', dev });
const handle = app.getRequestHandler()
const proxyOptions = require('./src/config/proxy');

app.prepare().then(() => {
  const server = express();

  if(proxyOptions){
    const proxy = require('http-proxy-middleware');
    Object.keys(proxyOptions).forEach(function (context) {
      server.use(proxy(context, proxyOptions[context]))
    })
  }

  // default routing
  server.all('*', (req, res) => handle(req, res))

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
}).catch(err => {
    console.log('An error occurred, unable to start the server')
    console.log(err)
  })