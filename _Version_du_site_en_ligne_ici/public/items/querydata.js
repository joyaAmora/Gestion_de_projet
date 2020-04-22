/*
function queryData() {
  fetch("./data.json")
    .then((results) => results.json())
    .then(console.log);
}
*/

async function queryData() {
  fetch("/api")
    .then((response) => response.json())
    .then((json) => console.log(json));

  //.then((json) => console.log(json.humiditySensor2));

  //.then((response) => response.json())
  //.then((json) => console.log(json));
}
