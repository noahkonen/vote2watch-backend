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


movie.post("/create", (req, res) => {
    Movie.create(req.body, (error, createdMovie) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdMovie);
      console.log(createdMovie);//  .json() will send proper headers in response so client knows it's json coming back
    });
    
    
    
    // Validate request
   
    // if (!req.body.title) {
    //   res.status(400).send({ message: "Content can not be empty!" });
    //   return;
    // }
  
    // // Create a Tutorial
    // const newMovie = new Movie({
    //   id: req.body.id,
    //   movieName: req.body.movieName,
    //   votes: req.body.votes,
    //   movieRoomID: req.body.movieRoomID
    // });
  
    // // Save Tutorial in the database
    // newMovie
    //   .save(newMovie)
    //   .then(data => {
    //     res.send(data);
    //   })
    //   .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while creating the Movie."
    //     });
    //   });



});

movie.get("/findAll", async (req, res) => {
  Movie.find().then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(400).send({
      message: err.message || "Error Occured"
    });
  });
});

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