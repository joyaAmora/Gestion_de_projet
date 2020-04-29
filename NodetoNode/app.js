var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const path = require("path");
const router = require("./routes");
require("./database");
const Task = require("./database/models/task.model");

app.set("view engine", "pug");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, "public")));
app.use("/", router);

app.post("/", function (req, res) {
  res.send("Got the temp data, thanks..!!");
  console.log(JSON.stringify(req.body));

  var myData = new Task(req.body);

  myData
    .save()

    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
});

app.get("/", function (req, res) {
  res.send("Hello from Server");
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("Example server listening at localhost:%s", host, port);
});
// https://gist.github.com/jotathebest/57aaea577375b3c924efffa74b48075f
