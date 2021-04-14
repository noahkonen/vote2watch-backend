const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieName: { type: String, default: "None", required: false },
  votes: { type: Number, default: 0, required: false },
  movieRoomID: { type: String, default: "Null", required: false }
});

module.exports = mongoose.model("Movie", movieSchema);