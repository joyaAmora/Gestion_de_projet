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

router.get("/tempgauge1", (req, res) => {
  measures.test(function (results) {
    var test = JSON.stringify(results);
    var test2 = JSON.parse(test);
    console.log("test2::::::" + test2);
    res.send(test2);
  });
});

module.exports = router;
