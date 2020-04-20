const router = require("express").Router();

router.get("/", (req, res) => {
  //.Find sur les données des dernières 24 heures
  // S'assurer que c'est dans une objet JS
  res.render("capture");
});

router.post("/", (req, res) => {
  //Comment sauvegarder les posts de C en Mongoose
});

module.exports = router;
