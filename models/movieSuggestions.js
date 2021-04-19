const mongoose = require("mongoose");

const movieSuggestionSchema = mongoose.Schema({
  name: { type: String, default: "None", required: false },
  vetos: { type: Number, default: 0, required: false },
  votes: { type: Number, default: 0, required: false },
  roomID: { type: String, default: "None", required: false }
});

module.exports = mongoose.model("MovieSuggestion", movieSuggestionSchema);