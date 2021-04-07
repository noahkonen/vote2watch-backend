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

room.post("/create", cors(corsOptions), async (req, res) => {
    Room.create(req.body, (error, createdRoom) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdRoom); //  .json() will send proper headers in response so client knows it's json coming back
    });
});

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

room.get('/findRoomsByRoomID/:roomID', cors(corsOptions), (req, res) => {
  const { roomID } = req.params;
  console.log("Find many for: " + roomID)
  Room.find({ name: roomID }, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      console.log(data)
      res.send(data)
    }
  });
});


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

room.patch("/update/:name", cors(corsOptions), async (req, res) => {
  try {
    const room = await Room.findOne({movieName: req.params.movieName})
    
    //increments the round by 1
    room.round += 1

    await room.save()
    res.send(room)
  } catch {
    res.status(404).json({ error: error.message});
    res.send({ error: "Room does not exist"});
  }
});


module.exports = room;