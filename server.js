const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//HTML Routes

app.get("/exercise", (req, res) => {
  res.sendFile("./public/exercise.html", { root: __dirname });
});

app.get("/stats", (req, res) => {
  res.sendFile("./public/stats.html", { root: __dirname });
});

//API Routes

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// App.get to pull up info for the range page
app.get("/api/workouts/range", ({}, res) => {
  db.Workout.find({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// App.post to submit new completed workouts
app.post("/api/workouts/", (req, res) => {
  db.Workout.create(req.body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// App.put to update workouts by MongoDB _id value and update the exercsise body
app.put("/api/workouts/:id", (req, res) => {
  db.Workout.findByIdAndUpdate({ _id: req.params.id }, { exercises: req.body })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
