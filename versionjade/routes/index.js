const router = require("express").Router();
const capturesRoute = require("./capture.routes");
const request = require("request");

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/capture", capturesRoute);

app.get("/api", (req, res) => {
  res.send(dataMeasures);
});

module.exports = router;
