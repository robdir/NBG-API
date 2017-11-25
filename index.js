
var bol = require ('bolcom') (process.env.BOL_KEY);
var https = require('https');
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3030

let app = express()
var books = []

const SPRINGEST_KEY = process.env.SPRINGEST_KEY

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

app.get('/books', (req, res) => {
  res.send(books)
})

var url = `https://api.springest.nl/trainings.json?api_key=${SPRINGEST_KEY}&query=Webdeveloper`

var req = https.get(url, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));

    var bodyChunks = [];
     res.on('data', function(chunk) {
       // You can process streamed parts here...
       console.log("CHUNK", chunk)
       bodyChunks.push(chunk);
     }).on('end', function() {
       var body = Buffer.concat(bodyChunks);
       app.get('/courses', (req, res) => {
         res.send(body)
       })
     })
   });

   req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});

/*https.get(url, function(courses){

  console.log(courses)

  app.get('/courses', (req, res) => {
    res.send(JSON.stringify(courses))
  })
}) */


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
