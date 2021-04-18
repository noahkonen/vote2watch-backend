const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 3003;
const mongoose = require("mongoose");
const Movie = require("./models/movies");
const bodyParser = require("body-parser");
const cors = require("cors");

//config cors option
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
};

//importing all of the controllers
const movieRoutes = require("./controllers/movieController");
const roomRoutes = require("./controllers/roomController");
const userRoutes = require("./controllers/userController");
const sugggestionRoutes = require("./controllers/suggestionController")

//mongo URI 
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
  app.use(cors())
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true}));

  //tell the app to use all of the routes and specify the paths
  app.use("/api/movies", movieRoutes)
  app.use("/api/rooms", roomRoutes)
  app.use("/api/users", userRoutes)
  app.use('/api/suggestions', sugggestionRoutes)

  // mongoose.connection.once("open", () => {
  //   console.log("connected to mongoose...");
  // });

  // listening to port
  app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
  });
});