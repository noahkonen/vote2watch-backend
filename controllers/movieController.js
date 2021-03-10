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

movie.get("/", (req, res) => {
    Movie.find({}, (err, foundMovies) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(foundMovies);
    });
});




// exports.index = (req, res) => {
//   Movie.find({}, (err, docs) => {
//     if (!err) {
//       res.json(200, {movies: docs });
//     } else {
//       res.json(500, {message: err});
//     }
//   });
// }


// exports.findById = (req, res) => {
//   var id = req.params.id;
//   Movie.findById(id, (err, doc) => {
//     if (!err & doc) {
//       res.json(200, doc);
//     } else if(err) {
//       res.json(500, {message: "Erro loading" +err});
//     } else {
//       res.json(404, {message: "Movie not found"});
//     }
//   });
// }

// exports.create = (req, res) => {
//   var movieName = req.body.movieName;
//   var votes = req.body.votes;
//   var movieRoomID = req.body.movieRoomID;
  
//   var newMovie = new Movie();

//   newMovie.movieName = movieName;
//   newMovie.votes = votes;
//   newMovie.movieRoomID = movieRoomID;

//   newMovie.save( (err) => {
//     if (!err) {
//       res.json(201, {message: "Movie created with name" + newMovie.movieName});
//     } else {
//       res.json(500, {message: "Could not create. Error: " + err});
//     }
//   });

// }

// exports.update = (req, res) => {
  
//   var id = req.body.id; 
//   var movieName = req.body.movieName;
//   var votes = req.body.votes; 

//   Movie.findById(id, (err, doc) => {
//   if(!err && doc) {
//     doc.name = movieName; 
//     doc.votes = votes; 
//     doc.save((err) => {
//       if(!err) {
//         res.json(200, {message: "Movie updated: " + workout_name});    
//       } else {
//         res.json(500, {message: "Could not update Movie. " + err});
//         }  
//       });
//       } else if(!err) {
//         res.json(404, { message: "Could not find Movie."});
//       } else {
//         res.json(500, { message: "Could not update Movie." + err});
//     }
//   }); 
// }

// exports.delete = (req, res) => {

//   var id = req.body.id; 
//   Movie.findById(id, (err, doc) => {
//     if(!err && doc) {
//       doc.remove();
//       res.json(200, { message: "Movie removed."});
//     } else if(!err) {
//       res.json(404, { message: "Could not find Movie."});
//     } else {
//       res.json(403, {message: "Could not delete Movie. " + err });
//     }
//   });
// }


module.exports = movie;