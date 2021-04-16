const mongoose = require("mongoose");
const MovieSuggestion = require("./movieSuggestions").schema


const roomSchema = mongoose.Schema({
  name: { type: String, default: "null", required: false },
  round: { type: Number, default: 0, required: false },
  movieList: [MovieSuggestion]
});

module.exports = mongoose.model("Room", roomSchema);