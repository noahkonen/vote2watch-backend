const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  id: {type: Number, default: 7, required: true},
  movieName: { type: String, default: "yeet", required: false },
  votes: { type: Number, default: 0, required: false },
  movieRoomID: { type: String, default: "4e5rd", required: false }
});

module.exports = mongoose.model("Movie", movieSchema);