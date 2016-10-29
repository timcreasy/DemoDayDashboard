const express = require('express');
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');

// app.use(history());
// app.use(express.static('public'));

// app.get('*', (req, res) => {
//   console.log(__dirname);
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// });


// serve static assets normally
app.use(express.static(__dirname + '/public'))

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/api/:beaconId', (req, res) => {

  setTimeout(() => {
    res.json({msg: "OK"});
  }, 2000);

});


app.listen(3000, () => {
  console.log("Server running on port 3000...");
});