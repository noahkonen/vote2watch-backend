const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  movieName: { type: String, default: "None", required: false }
  //Netfix API information can be added to schema at a later time


  
});

module.exports = mongoose.model("Movie", movieSchema);