const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/:beaconId', (req, res) => {

  setTimeout(() => {
    res.json({msg: "Invalid"});
  }, 2000);

  
});

app.listen(3000, () => {
  console.log("Server running on port 3000...");
});