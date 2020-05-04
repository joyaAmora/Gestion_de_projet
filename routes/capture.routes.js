const router = require("express").Router();
const Capture = require("../database/models/capture.js");

router.get("/", (req, res) => {
      res.render("capture");
});

router.post("/", (req, res) => {
  //Comment sauvegarder les posts de C en Mongoose
  const item = new Capture(req.body);
  item
    .save()
    .then((newItem) => {})
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
