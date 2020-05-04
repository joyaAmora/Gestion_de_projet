const Capture = require("../database/models/capture.js");
/*
let measures = {
  humiditySensor1: 10, //METTRE QUERIES ICI
  humiditySensor2: 20, //METTRE QUERIES ICI
  waterSensor: 30, //METTRE QUERIES ICI
  tempsensor1: 40, //METTRE QUERIES ICI
};
*/
/*
let dataMeasures = JSON.stringify(measures, null, 2);


exports.mesures = dataMeasures;
*/
exports.test = function (callback) {
  Capture.findOne()
    .sort({ code: -1 })
    .limit(1)
    .exec()
    .then((latest) => {
      callback(latest);
    });
};

exports.last24Hours =   function(callback) {
  Capture.find(
  { createdAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 130) } },
  function (err, res) {}
)
  .exec()
  .then((captures) => {
    callback(captures);
  });
};
/////////////

/////////////
