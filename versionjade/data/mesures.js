let measures = {
  humiditySensor1: 10, //METTRE QUERIES ICI
  humiditySensor2: 20, //METTRE QUERIES ICI
  waterSensor: 30, //METTRE QUERIES ICI
  tempsensor1: 40, //METTRE QUERIES ICI
};

let dataMeasures = JSON.stringify(measures, null, 2);

exports.mesures = dataMeasures;
