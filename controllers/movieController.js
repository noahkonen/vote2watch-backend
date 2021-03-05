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














module.exports = movie;