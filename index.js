var bol = require ('bolcom') ('1673B7353F954E90916BFD4931E48C2A');
const express = require('express')
const cors = require('cors')

const PORT = process.env.PORT || 3030

let app = express()
var books = []

app.use(cors())


  bol.catalog.search ({ q: 'Web Developer' }, function (err, data) {
    if (err) {
      console.log ('Search failed');
      console.log (err);
      return;
    }

    for (var p in data.products) {
      var product = data.products[p];
      books.push(product.title + ' - €' + product.offerData.offers[0].price)
    }
  })

app.get('/', (req, res) => {
  res.send(books)

})

app.listen(PORT, () => {
  console.log(`Hi Marjo, I'm listening on port ${PORT}`)
})



/*
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
  }) */
