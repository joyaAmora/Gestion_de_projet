const router = require("express").Router();
const capturesRoute = require("./capture.routes");
const request = require("request");
const measures = require("../data/mesures");

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/capture", capturesRoute);

router.get("/api", (req, res) => {
  res.send(measures.mesures);
});

module.exports = router;
