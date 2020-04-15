const express = require("express");
var path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
const mysql = require('mysql');

//---------test mysql-------------
//#region //Infos de connexion
const db = mysql.createConnection({
  host: 'localhost',
  user: 'datagetter',
  password: 'Qwerty1234',
  database: 'testing'
});
//#endregion
//#region //Connexion vers le server + gestion erreur
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});
global.db = db;
//#endregion
//#region // on fait ici la query pour toute afficher la table SensorData
let query = "SELECT * FROM `SensorData`";

db.query(query, (err, result) => {
  if (err) {
    throw err
  }
  console.log(result)
});
//#endregion
//---------test mysql-------------



app.set("view engine", "pug");

app.get("/dashboard", (req, res) => {
  res.render("dashboard"); //On render le index.pug en envoyant la class "tasks" en tant que data de base
});

app.get("/about", (req, res) => {
  res.render("about"); //On render le index.pug en envoyant la class "tasks" en tant que data de base
});

app.get("/", (req, res) => {
  res.render("home"); //On render le index.pug en envoyant la class "tasks" en tant que data de base
});

app.listen(3001);
