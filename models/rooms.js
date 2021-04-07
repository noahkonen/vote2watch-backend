const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: { type: String, default: "null", required: false },
  round: { type: Number, default: 0, required: false }
});

module.exports = mongoose.model("Room", roomSchema);