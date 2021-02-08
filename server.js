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
  useCreateIndex: true,
});

app.use(require("./routes/api-routes.js"))
app.use(require("./routes/html-routes.js"))

//HTML Routes

app.get("/exercise", (req, res) => {
  res.sendFile("./public/exercise.html", { root: __dirname });
});

app.get("/stats", (req, res) => {
  res.sendFile("./public/stats.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
