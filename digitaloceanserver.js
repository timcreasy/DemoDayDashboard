const app = require('express')();
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const User = require('./models/user');
const Favorite = require('./models/favorite');
const bcrypt = require('bcrypt');
const { connect } = require('./db/database.js');
const Student = require('./models/student');

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Server running');
});

app.post('/api/users', (req, res, next) => {
  User
   .create({name: req.body.name, company: req.body.company, email: req.body.email, password: req.body.password})
   .then((user) => {
     res.json({user: user})
   })
   .catch((err) => {
     next(err);
    });
});

app.post('/api/students', (req, res, next) => {
  Student
   .create({beaconId: req.body.beaconId, email: req.body.email, password: req.body.password})
   .then((student) => {
     res.json({student: student})
   })
   .catch((err) => {
     next(err);
    });
});


app.post('/api/students/:beaconId', (req, res) => {

  Student
    .find({beaconId: req.params.beaconId})
    .then((student) => {
      res.send({student: student});
    });

});


app.post('/api/login', (req, res) => {
  User
    .findOne({email: req.body.email})
    .then((user) => {
      if (!user) {
        res.json({msg: "Email is not registered"});
      } else {
        bcrypt.compare(req.body.password, user.password, (err, matches) => {
          if (err) {
            res.json({msg: "An unknown error occured, try again"});
          } else {
            if (!matches) {
              res.json({msg: "Incorrect password"});
            } else if (matches) {
              res.json({user: user});
            }
          }
        })
      }
    })
    .catch((err) => {
      res.json({msg: "An unknown error occured, try again"});
    })
});


app.post('/api/student/login', (req, res) => {
  Student
    .findOne({email: req.body.email})
    .then((student) => {
      if (!student) {
        res.json({msg: "Email is not registered"});
      } else {
        bcrypt.compare(req.body.password, student.password, (err, matches) => {
          if (err) {
            res.json({msg: "An unknown error occured, try again"});
          } else {
            if (!matches) {
              res.json({msg: "Incorrect password"});
            } else if (matches) {
              res.json({student: student});
            }
          }
        })
      }
    })
    .catch((err) => {
      res.json({msg: "An unknown error occured, try again"});
    })
});

app.post('/api/favorites', (req, res, next) => {
  var favorite = new Favorite({ employer: req.body.employer, student: req.body.student, card: req.body.card });
  favorite.save(function (err) {
    if (err) return next(err);
    // saved!
   res.sendStatus(201);
  })
});

app.get('/api/favorites/:userId', (req, res, next) => {
  Favorite
    .find({employer: req.params.userId})
    .then((favorites) => {
       res.status(200).json({favorites: favorites});
    });
});

app.delete('/api/favorites', (req, res, next) => {

  Favorite
    .find({employer: req.body.employer, student: req.body.student})
    .remove()
    .then(() => {
      res.sendStatus(200);
    });

});

connect
  .then(() => {
    server.listen(3000, () => {
      console.log("Server listening on port 3000...");
    });
  })
  .catch((err) => {
    console.log("An error occured:", err);
  });

