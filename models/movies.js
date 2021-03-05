const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  id: { type: String, default: "4", required: false },
  movieName: { type: String, default: "yeet", required: false },
  votes: { type: Number, default: 0, required: false },
  movieRoomID: { type: String, default: "4e5rd", required: false }
});

module.exports = mongoose.model("Movie", movieSchema);