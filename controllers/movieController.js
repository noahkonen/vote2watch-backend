const express = require("express");

const movie = express.Router();

const Movie = require("../models/movies");

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

//create a new movie
movie.post("/create", cors(corsOptions), (req, res) => {
    Movie.create(req.body, (error, createdMovie) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdMovie);
      console.log(createdMovie);//  .json() will send proper headers in response so client knows it's json coming back
    });
});

//get all movies
movie.get("/findAll", cors(corsOptions), async (req, res) => {
  Movie.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "Error Occured"
    });
  });
});

//find a movie by its name
movie.get('/findOne/:movieName', cors(corsOptions), (req, res) => {
  const { movieName } = req.params;
  Movie.findOne({movieName}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//find all movies who's room id's match i.e: They are in the same game room
movie.get('/findMoviesByRoomID/:id', cors(corsOptions), (req, res) => {
  const { id } = req.params;
  console.log("Find many for: " + id)
  Movie.find({ movieRoomID: id }, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      console.log(data)
      res.send(data)
    }
  });
});

//deletes a movie by its name
movie.delete("/delete/:movieName", cors(corsOptions), (req, res) => {
  const { movieName } = req.params;
  Movie.remove({movieName}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

//updates the movie votes, increments it by 1
movie.put("/updateVotes/:movieName", cors(corsOptions), async (req, res) => {
  Movie.findOne({movieName: req.params.movieName}, (err, p) => {
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

module.exports = movie;