const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes");
const path = require("path");
const bodyParser = require("body-parser");
require("./database");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use("/", routes);

app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

// var fs = require("fs");
// var pathDuFichier = "./public/items/data.json";
 
// let measures = {
//   humiditySensor1: 100,
//   humiditySensor2: 69,
//   waterSensor: 10,
//   tempsensor1: 17,
// };
 
// let data = JSON.stringify(measures);
// fs.writeFileSync(pathDuFichier, data);