
var bol = require ('bolcom') (process.env.BOL_KEY);
var https = require('https');
const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 3030
let app = express()
var books = []
const SPRINGEST_KEY = process.env.SPINGEST_KEY

app.use(cors())


bol.catalog.search ({ q: 'Web Developer' }, function (err, data) {
    if (err) {
      console.log ('Search failed');
      console.log (err);
      return;
    }

    for (var p in data.products) {

      var product = data.products[p];

      books.push([product.title + ' - €' + product.offerData.offers[0].price, product.media] )

    }
  })

app.get('/books', (req, res) => {
  res.send(books)
})

var url = `https://api.springest.nl/trainings.json?api_key=${SPRINGEST_KEY}&query=Webdeveloper`

var req = https.get(url, function(res) {

    var bodyChunks = [];
     res.on('data', function(chunk) {
       bodyChunks.push(chunk);
     }).on('end', function() {
       var body = []
       bodyChunks = bodyChunks.map((chunk) => chunk.toString()).join('')
       body.push(JSON.parse(bodyChunks));

       app.get('/courses', (req, res) => {
         res.send(body)
       })
     })
   });

   req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});


app.listen(PORT, () => {
  console.log(`Hi Marjo, I'm listening on port ${PORT}`)
})
