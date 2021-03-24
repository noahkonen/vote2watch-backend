const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 3003;
const mongoose = require("mongoose");
const Movie = require("./models/movies");
const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3003"
};

const movieRoutes = require("./controllers/movieController")
const roomRoutes = require("./controllers/roomController");

const mongodbURI = "mongodb+srv://NateHockman:vote2watch@testclustertodos.gt42r.mongodb.net/testClusterTodos?retryWrites=true&w=majority"


//error / disconnect
mongoose.connection.on("error", err =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

// Fix depreciation warnings
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);

// Database connection
mongoose.connect(mongodbURI, { useNewUrlParser: true }).then(() => {
  const app = express()
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));

  app.use("/api/movies", movieRoutes)
  app.use("/api/rooms", roomRoutes)


  // mongoose.connection.once("open", () => {
  //   console.log("connected to mongoose...");
  // });

  // listening to port
  app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
  });
});