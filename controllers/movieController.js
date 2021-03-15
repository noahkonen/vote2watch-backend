const express = require("express");

const movie = express.Router();

const Movie = require("../models/movies");


movie.post("/create", async (req, res) => {
    Movie.create(req.body, (error, createdMovie) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdMovie); //  .json() will send proper headers in response so client knows it's json coming back
    });
});

// movie.get("/findAll", async (req, res) => {
//   Movie.find( (err, data) => {
//     if (err) {
//       res.status(400).json({error: error.message});
//     } else {
//       res.send(data);
//     }
//   });
// });

movie.get('/findOne/:movieName', (req, res) => {
  const { movieName } = req.params;
  Movie.findOne({movieName}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

movie.delete("/delete/:movieName", (req, res) => {
  const { movieName } = req.params;
  Movie.remove({movieName}, (err, data) => {
    if (err) {
      res.status(400).json({ error: error.message});
    } else {
      res.send(data);
    }
  });
});

movie.patch("/update/:movieName", async (req, res) => {
  try {
    const movie = await Movie.findOne({movieName: req.params.movieName})
    
    //increments the votes by 1
    movie.votes += 1

    await movie.save()
    res.send(movie)
  } catch {
    res.status(404).json({ error: error.message});
    res.send({ error: "Post does not exist"});
  }
});


module.exports = movie;