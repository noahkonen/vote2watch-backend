const mongoose = require("mongoose");

const axios = require('axios')

const express = require("express");

const seed = express.Router();

const url = 'https://unogsng.p.rapidapi.com/search'


options = {
    headers: {  
        "x-rapidapi-key": "b6228938c0msh07e03d79e7fe13ep179926jsna1454cdc4ac9",
        "x-rapidapi-host": "unogsng.p.rapidapi.com",
        "useQueryString": true
    }
}

seed.get("/seed", async (req, res) => {
    const response = await axios.get(url, options).then( (data) => {
        const results = data.data.results[0]

        data.data.results.forEach(movie => {
           newObject = {movieName: movie.title, img: movie.img, runtime: movie.runtime, year: movie.year}
           axios.post("http://localhost:3003/api/movies/create", newObject)
        });

        //res.send(data.data.results[0])
       
    }).catch(err => {
        console.log(err)
    })
}) 

module.exports = seed;

