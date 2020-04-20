const router = require("express").Router();


router.get("/", (req, res) => {
  res.render("capture");
});

router.post("/", (res, res) => {
  //Comment sauvegarder les posts de C en Mongoose
  
});


module.exports = router;