const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 3003;
const mongoose = require("mongoose");
const Movie = require("./models/movies")


app.use(express.json());

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
mongoose.connect(mongodbURI, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});


// Routes
// Post, get, put, delete 
const movieController = require("./controllers/movieController")
app.use("/movieController", movieController);


// app.get("/*", (req, res) => {
//     res.redirect("/movieController");
// });

app.post("/create", async (req, res) => {
    Movie.create(req.body, (error, createdMovie) => {
      if (error) {
        res.status(400).json({ error: error.message });
      }
      res.status(200).send(createdMovie); //  .json() will send proper headers in response so client knows it's json coming back
    });
});




// listening to port
app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
});