const router = require("express").Router();
const captureRoutes = require("./capture.routes");
const request = require("request")

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/capture", captureRoutes);

// router.use('/capture', function (req, res, next) {
//   request({url: baseUrl + '/capture',timeout:2000}, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log("Mesures receptionnées depuis ESP8666" + body) 
//       res.send(body);
//     } else {
//       console.log("ESP8666 muet, envoi du jeu de données test")
//       res.send({"t":"21.70","h":"29.50","pa":"984.43"});
//     }
//   })
// });

module.exports = router;
