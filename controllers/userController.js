const express = require("express");

const user = express.Router();

const User = require("../models/user");

const cors = require("cors");

var whitelist = ['http://localhost:3000/createroompage']

var corsOptions = {
  origin: 'http://localhost:3000'
  // function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // }
};

user.post("/create", cors(corsOptions), async (req, res) => {
    User.create(req.body, (error, createdUser) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdUser); //  .json() will send proper headers in response so client knows it's json coming back
    });
});

user.get("/findAll", cors(corsOptions), async (req, res) => {
  User.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "Error Occured"
    });
  });
});


user.get('/findOne/:id', cors(corsOptions), (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      console.log(data);
      res.send(data);
    }
  });
});


user.delete("/delete/:id", cors(corsOptions), (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

user.delete("/deleteAll", cors(corsOptions), (req, res) => {
  User.deleteMany({}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

user.put("/updateVotes/:id", cors(corsOptions), async (req, res) => {
  User.findById(req.params.id, (err, p) => {
      if (!p) {
          return next(new Error('DNE'));
      } else {
          p.numVotes = p.numVotes - 1

          p.save((err) => {
              if (err) {
                res.status(400).json({ error: error.message});
              } else {
                res.send(p);
              }
          });
      }

  });
});

user.put("/updateVetos/:id", cors(corsOptions), async (req, res) => {
    User.findById(req.params.id, (err, p) => {
        if (!p) {
            return next(new Error('DNE'));
        } else {
            p.numVetos = p.numVetos - 1
  
            p.save((err) => {
                if (err) {
                  res.status(400).json({ error: error.message});
                } else {
                  res.send(p);
                }
            });
        }
  
    });
  });


module.exports = user;