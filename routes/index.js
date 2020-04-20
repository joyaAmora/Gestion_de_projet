const router = require("express").Router();
const captureRoutes = require("./capture.routes");

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/capture", captureRoutes);

module.exports = router;
