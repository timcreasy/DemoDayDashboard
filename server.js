const express = require('express');
const path = require('path');
const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');
const sess = {
  secret: 'superdupersecretkey',
};

const PORT = process.env.PORT || 3000;

app.use(session(sess));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/api/user', (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.json({msg: "No user"});
  }
});

app.get('/api/:beaconId', (req, res) => {

  let validBeacons = [ 
    "DF4haB",
    "rThFqB",
    "PWg9rP",
    "iiv4N7",
    "fvPXpe",
    "NzQfvK",
    "FDWh3d",
    "tNeTBg",
    "epYo6a",
    "Jtxg74",
    "A7egMt",
    "n4ELhz",
    "XSNvVg",
    "5UcKhq",
    "AorfXx",
    "GEhEzT",
    "u5EVLR",
    "WZ5bhu",
    "uB3xRF",
    "WMJjiK",
    "XScoFx",
    "P4pjGf",
    "fEAwYB",
    "Qou8uc",
    "SAHxL2",
    "tNVNht",
    "nuM44w" 
  ];

  let beaconValid = validBeacons.includes(req.params.beaconId);

  if (beaconValid) {

    axios
      .get('http://104.236.71.66:3000/api/students/' + req.params.beaconId)
      .then(({data: {student}}) => {
        if (student.length > 0) {
          res.json({msg: "Registered"});
        } else {
          res.json({msg: "Valid"});
        }
      })
      .catch(console.log);

    // axios
    //   .post('http://104.236.71.66:3000/api/students/beacon', {beaconId: req.params.beaconId})
    //   .then(({data: {student}}) => {
    //     if (student.length > 0) {
    //       res.json({msg: "Registered"});
    //     } else {
    //       res.json({msg: "Valid"});
    //     }
    //   })
    //   .catch(console.log);

  } else {
    res.json({msg: "Invalid"});
  }

});


app.post('/api/login', (req, res) => {

    axios
      .post('http://104.236.71.66:3000/api/student/login', {
        email: req.body.email,
        password: req.body.password
      })
      .then(response => {
        if (response.data.student) {
          console.log("dug");
          req.session.user = response.data.student;
        }
        res.json(response.data);
      })
      .catch(console.log);


});



app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});