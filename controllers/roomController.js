const express = require("express");

const room = express.Router();

const Room = require("../models/rooms");


room.post("/create", async (req, res) => {
    Room.create(req.body, (error, createdRoom) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdRoom); //  .json() will send proper headers in response so client knows it's json coming back
    });
});

room.get("/findAll", async (req, res) => {
  Room.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "Error Occured"
    });
  });
});


room.get('/findOne/:name', (req, res) => {
  const { name } = req.params;
  Room.findOne({name}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

room.delete("/delete/:name", (req, res) => {
  const { name } = req.params;
  Room.remove({name}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

room.patch("/update/:name", async (req, res) => {
  try {
    const room = await Room.findOne({movieName: req.params.movieName})
    
    //increments the votes by 1
    room.round += 1

    await room.save()
    res.send(room)
  } catch {
    res.status(404).json({ error: error.message});
    res.send({ error: "Room does not exist"});
  }
});


module.exports = room;