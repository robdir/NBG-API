var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var bol = require ('bolcom') ('1673B7353F954E90916BFD4931E48C2A');

server.listen(3002)

bol.catalog.search ({ q: 'Web Developer' }, function (err, data) {
  if (err) {
    console.log ('Search failed');
    console.log (err);
    return;
  } //if

  for (var p in data.products) {
    var product = data.products[p];
    console.log (product.title + ' - €' + product.offerData.offers[0].price);
    
    io.emit('action', {
            	type: 'UPDATE_BOOKS',
            	payload: product.title,
            })
  }//for
}) //bolcatalog

io.on('connection', socket => {
    console.log('got connection')
  })



/*const express = require('express')

const PORT = process.env.PORT || 3030

let app = express()

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.listen(PORT, () => {
  console.log(`Hi Marjo, I'm listening on port ${PORT}`)
}) */
