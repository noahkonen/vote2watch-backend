const express = require("express");

const user = express.Router();

const User = require("../models/user");

const cors = require("cors");

var whitelist = ['http://localhost:3000/createroompage']

//cors options config
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

//user post method
user.post("/create", cors(corsOptions), async (req, res) => {
    User.create(req.body, (error, createdUser) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdUser); //  .json() will send proper headers in response so client knows it's json coming back
    });
});

//get array of all the users
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

//find one user by id
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

//delete one user by id
user.delete("/delete/:id", cors(corsOptions), (req, res) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//deletes all users
user.delete("/deleteAll", cors(corsOptions), (req, res) => {
  User.deleteMany({}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//updates suggestion, takes two URL params
user.put("/updateSuggestion/:id", cors(corsOptions), async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { suggestion: req.body.suggestion }, (err, p) => {
        if (!p) {
            return next(new Error('DNE'));
        } else {
            p.save((err) => {
                if (err) {
                  res.status(400).json({ error: error.message});
                } else {
                    res.send(p);
                }
            });
        }
    })
});

//udpates the room, takes 2 URL params
user.put("/updateRoom/:id/", cors(corsOptions), async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { room: req.body.room }, (err, p) => {
        if (!p) {
            return next(new Error('DNE'));
        } else {
            p.save((err) => {
                if (err) {
                  res.status(400).json({ error: error.message});
                } else {
                  res.send(p);
                }
            });
        }
    })
});

//update the name, takes 2 URL params
user.put("/updateName/:id", cors(corsOptions), async (req, res) => {
    User.findByIdAndUpdate(req.params.id, { name: req.body.name }, (err, p) => {
        if (!p) {
            return next(new Error('DNE'));
        } else {
            p.save((err) => {
                if (err) {
                  res.status(400).json({ error: error.message});
                } else {
                  res.send(p);
                }
            });
        }
    })
});

//update the votes by id, decrements it by 1
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

//updates the vetos by id, decrements it by 1
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