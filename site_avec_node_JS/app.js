const express = require("express");
var path = require("path");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

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

app.listen(3000);
