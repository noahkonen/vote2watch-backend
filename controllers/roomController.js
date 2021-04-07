const express = require("express");

const room = express.Router();

const Room = require("../models/rooms");

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

//create a new room
room.post("/create", cors(corsOptions), async (req, res) => {
    Room.create(req.body, (error, createdRoom) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdRoom); //  .json() will send proper headers in response so client knows it's json coming back
    });
});

//get all rooms
room.get("/findAll", cors(corsOptions), async (req, res) => {
  Room.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "Error Occured"
    });
  });
});

//find one room by name
room.get('/findOne/:name', cors(corsOptions), (req, res) => {
  const { name } = req.params;
  console.log("Find one request found for: " + name)
  Room.findOne({name}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      console.log(data);
      res.send(data);
    }
  });
});

//deletes one room by name
room.delete("/delete/:name", cors(corsOptions), (req, res) => {
  const { name } = req.params;
  Room.remove({name}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//deletes all rooms
room.delete("/deleteAll", cors(corsOptions), (req, res) => {
  console.log("Delete All Called")
  Room.deleteMany({}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//updates the room round, increments it by 1
room.put("/updateRound/:name", cors(corsOptions), async (req, res) => {
  Room.findOne({name: req.params.name}, (err, p) => {
    if (!p) {
        return next(new Error('DNE'));
    } else {
        p.round = p.round + 1

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


module.exports = room;