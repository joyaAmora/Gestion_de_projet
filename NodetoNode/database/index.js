/*const mongoose = require("mongoose");
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const protocol = "mongodb";
const url = "127.0.0.1";
const port = 27017;
const username = "admin";
const password = "admin";
const database = "webserveur";

const connectionString = `${protocol}://${username}:${password}@${url}:${port}/${database}`;

mongoose
  .connect(connectionString, options)
  .then((db) => {
    console.log("Connecté avec succès" , db);
  })
  .catch((err) => {
    console.log(err);
  });
*/
const mongoose = require("mongoose");

const protocol = "mongodb+srv";
const url = "cluster0-pqmkz.mongodb.net";
const params = "?retryWrites=true&w=majority";
const username = "etd";
const password = "shawi";
const database = "testing";

const connectionString = `${protocol}://${username}:${password}@${url}/${database}${params}`;
//const connectionString = `${protocol}://${url}/${database}${params}`;

console.log(connectionString);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

mongoose
  .connect(connectionString, options)
  .then((db) => {
    console.log("Connecté avec succès");
  })
  .catch((err) => {
    console.log(err);
  });
