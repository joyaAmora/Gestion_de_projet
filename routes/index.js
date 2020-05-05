const router = require("express").Router();
const capturesRoute = require("./capture.routes");
const request = require("request");
const measures = require("../data/mesures");
const Capture = require("../database/models/capture.js");

router.get("/", (req, res) => {
  res.render("home");
});

router.use("/capture", capturesRoute);

router.get("/api", (req, res) => {
  res.send(measures.mesures);
});

router.get("/tempgauge1", (req, res) => {
  measures.test(function (results) {
    //console.log(results);
    var test = JSON.stringify(results);
    var test2 = JSON.parse(test);
    // console.log("test2::::::" + test2);
    res.send(test2);
    //console.log(results.AirHum);
  });
});

router.get("/last24hours", (req,res) => {
  measures.last24Hours(function (results) {
    //console.log(results);
    var data = JSON.stringify(results);
    var data2 = JSON.parse(data);
    //console.log(data2);
        //Boucle for avec modulo 4 pour avoir ne garder que les données aux 2hrs
    res.send(data2)
  })
})


router.get("/datas", (req, res) => {
  Capture.find(         //24hrs data serveur
  { createdAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) } },
  function (err, res) {})
  .exec()
  .then((captures) => {
    //console.log(captures)
    //reduce en JS ou boucle modulo 4
    var table = []
    var j = 0
    var i = 0
    for(i; i < 72; i++){
        if(i%4 == 0){
          table[j] = captures[i] 
          j++
        }
    }
    res.send(table)
    //validation qu'on a un tableau de 12 données
    var k = 0;
    for(k;k < 12; k++)
    {
        console.log(table[k])
    }    
  })
  .catch((e) => {
    console.log(e);
  });
})

module.exports = router;
