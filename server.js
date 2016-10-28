const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));


app.get('/api/:beaconId', (req, res) => {

  setTimeout(() => {
    res.json({msg: "OK"});
  }, 2000);

});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});