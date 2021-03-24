const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  id: { type: Number, default: 1, required: false },
  name: { type: String, default: "yeet", required: false },
  round: { type: Number, default: 0, required: false }
});

module.exports = mongoose.model("Room", roomSchema);