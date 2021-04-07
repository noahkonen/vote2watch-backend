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


user.get('/findOne/:name', cors(corsOptions), (req, res) => {
  const { name } = req.params;
  console.log("Find one request found for: " + name)
  User.findOne({name}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      console.log(data);
      res.send(data);
    }
  });
});


user.delete("/delete/:name", cors(corsOptions), (req, res) => {
  const { name } = req.params;
  User.remove({name}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

user.delete("/deleteAll", cors(corsOptions), (req, res) => {
  console.log("Delete All Called")
  User.deleteMany({}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

user.patch("/updateVotes/:id", cors(corsOptions), async (req, res) => {
  try {
    //Put what we want to update here if there needs to be anything 
    //updated
    const id = req.params

    const user = await User.findById({_id: id })

    user.numVotes -= 1

    await user.save()
    res.send(user)
  } catch {
    res.status(404).json({ error: error.message });
    res.send({ error: "Room does not exist"});
  }
});

user.patch("/updateVetos/:id", cors(corsOptions), async (req, res) => {
    try {
      //Put what we want to update here if there needs to be anything 
      //updated
      const user = await User.findOne({_id: req.params._id})

      user.numVetos -= 1

      await user.save()
      res.send(user)
    } catch {
      res.status(404).json({ error: error.message});
      res.send({ error: "Room does not exist"});
    }
  });


module.exports = user;