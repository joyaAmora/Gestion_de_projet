const router = require("express").Router();
const Capture = require("../database/models/capture.js");

router.get("/", (req, res) => {
  //.Find sur les données des dernières 24 heures

  Capture.find(
    { createdAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 130) } },
    function (err, res) {}
  )
    .exec()
    .then((captures) => {
      console.log(captures);
      res.render("capture", { captures });
    })
    .catch((e) => {
      console.log(e);
    });
  // S'assurer que c'est dans une objet JS
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
