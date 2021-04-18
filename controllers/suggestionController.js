const express = require("express");

const suggestion = express.Router();

const Suggestion = require("../models/movieSuggestions");

const cors = require("cors");

var whitelist = ['http://localhost:3000']

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

//create a new movie
suggestion.post("/create", cors(corsOptions), (req, res) => {
    Suggestion.create(req.body, (error, createdMovieSuggestion) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdMovieSuggestion);
      console.log(createdMovieSuggestion);//  .json() will send proper headers in response so client knows it's json coming back
    });
});

//get all movies
suggestion.get("/findAll", cors(corsOptions), async (req, res) => {
    Suggestion.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "Error Occured"
    });
  });
});

//find a movie by its name
suggestion.get('/findOne/:id', cors(corsOptions), (req, res) => {
  const { id } = req.params;
  Suggestion.findOne({id}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//find all movies who's room movieRoom id's match i.e: They are in the same game room
suggestion.get('/findMoviesByRoomID/:id', cors(corsOptions), (req, res) => {
  const { id } = req.params;
  console.log("Find many for: " + id)
  Suggestion.find({ movieRoomID: id }, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      console.log(data)
      res.send(data)
    }
  });
});

//deletes a movie by its name
suggestion.delete("/delete/:movieName", cors(corsOptions), (req, res) => {
  const { movieName } = req.params;
  Suggestion.remove({movieName}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//deletes all suggestions
suggestion.delete("/deleteAll", cors(corsOptions), (req, res) => {
    console.log("Delete All Called")
    Suggestion.deleteMany({}, (err, data) => {
      if (err) {
        res.status(400).json({ error: error.message});
      } else {
        res.send(data);
      }
    });
  });

//updates the movie votes, increments it by 1
suggestion.put("/updateVotes/:id", cors(corsOptions), async (req, res) => {
    Suggestion.findOne(req.params.id, (err, p) => {
    if (!p) {
        return next(new Error('DNE'));
    } else {
        p.votes = p.votes + 1

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

//updates the movie votes, increments it by 1
suggestion.put("/updateVetos/:movieName", cors(corsOptions), async (req, res) => {
    Suggestion.findOne({name: req.params.name}, (err, p) => {
    if (!p) {
        return next(new Error('DNE'));
    } else {
        p.vetos = p.vetos + 1

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

module.exports = suggestion;