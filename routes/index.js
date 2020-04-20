const router = require("express").Router();
const captureRoutes = require("./capture.routes");

router.get("/", (req, res) => {
  res.render("home");
});

router.user("/capture", captureRoutes);

module.exports = router;
