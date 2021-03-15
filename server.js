const { response } = require("express");
const express = require("express");
const app = express();
const PORT = 3003;
const mongoose = require("mongoose");
const Movie = require("./models/movies")

const routes = require("./controllers/movieController")

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
  app.use("/api", routes)


  // mongoose.connection.once("open", () => {
  //   console.log("connected to mongoose...");
  // });

  // listening to port
  app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
  });
});





//=======================
//ROUTES
//=======================

// app.get("/*", (req, res) => {
//     res.redirect("/movieController");
// });

// //post method route
// app.post("/create", async (req, res) => {
//     Movie.create(req.body, (error, createdMovie) => {
//       if (error) {
//         res.status(400).json({ error: error.message });
//       }
//       res.status(200).send(createdMovie); //  .json() will send proper headers in response so client knows it's json coming back
//     });
// });

// //get all method route
// app.get('/findAll', (req, res) => {
//   Movie.find( (err, data) => {
//     if (err) {
//       res.status(400).json({error: error.message});
//     } else {
//       res.send(data);
//     }
//   });
// });

// //get one method route
// app.get('/findOne/:movieName', (req, res) => {
//   const { movieName } = req.params;
//   Movie.findOne({movieName}, (err, data) => {
//     if (err) {
//       res.status(400).json({ error: error.message});
//     } else {
//       res.send(data);
//     }
//   });
// });

// //delete method route
// app.delete("/delete/:movieName", async (req, res) => {
//   const { movieName } = req.params;
//   Movie.remove({movieName}, (err, data) => {
//     if (err) {
//       res.status(400).json({ error: error.message});
//     } else {
//       res.send(data);
//     }
//   });
// });

// //patch (i believe this functions similar to put) method route
// app.patch("/update/:movieName", async (req, res) => {
//   try {
//     const movie = await Movie.findOne({movieName: req.params.movieName})

//     movie.votes += 1

//     await movie.save()
//     res.send(movie)
//   } catch {
//     res.status(404).json({ error: error.message});
//     res.send({ error: "Post does not exist"});
//   }
// });

