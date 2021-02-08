const router = require("express").Router();

router.get("/exercise", (req, res) => {
  res.sendFile("../public/exercise.html", { root: __dirname });
});

router.get("/stats", (req, res) => {
  res.sendFile("../public/stats.html", { root: __dirname });
});

router.get("/", (req, res) => {
  res.sendFile("../public/stats.html", { root: __dirname });
});

module.exports = router;
