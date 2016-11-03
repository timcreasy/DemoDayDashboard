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


app.post('/api/user', (req, res) => {

    let userData = {}

    console.log(req.body);

    axios.get('http://104.236.71.66:3000/api/users/')
      .then(({data: {users}}) => {
        return userData.employers = users;
      })
      .then(() => {
        return axios.get('http://104.236.71.66:3000/api/note/' + req.body.userId)
      })
      .then(({data: {notes}}) => {
        userData.notes = notes;
      })
      .then(() => {
        return axios.get('http://104.236.71.66:3000/api/beacon/' + req.body.beaconId)
      })
      .then(({data: {favorites}}) =>  {
        userData.favorites = favorites;
        res.json(userData);
      })
      .catch(console.log);

});


app.post('/api/students', (req, res) => {

    const userToCreate = {
      beaconId: req.body.beaconId,
      email: req.body.email,
      password: req.body.password
    };

    axios.post('http://104.236.71.66:3000/api/students', userToCreate)
      .then(response =>  {
        res.sendStatus(201);
      })
      .catch(console.log);
})


app.post('/api/employer', (req, res) => {

    const employerToCreate = {
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      password: "test"
    };

    axios.post('http://104.236.71.66:3000/api/users', employerToCreate)
      .then(response =>  {
        res.json({user: response.data.user});
      })
      .catch(console.log);
})


app.post('/api/note', (req, res) => {

  const noteToPost = {
    note: req.body.note,
    employer: req.body.employer,
    student: req.body.student,
    timestamp: req.body.timestamp
  };

  axios.post('http://104.236.71.66:3000/api/new/note', noteToPost)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(console.log);

});


app.post('/api/favorite', (req, res) => {
  
  const favorite = {
    employer: req.body.employer,
    student: req.session.beaconId,
    card: req.body.card,
  };

  axios.post('http://104.236.71.66:3000/api/favorites', favorite)
    .then(response =>  {
      res.sendStatus(201);
    })
    .catch(console.log);

});


app.post('/api/remove/note', (req, res) => {

  axios.post('http://104.236.71.66:3000/api/remove/note', {noteId: req.body.noteId})
    .then(response => {
      res.send(202);
    })
    .catch(console.log);

});



app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});