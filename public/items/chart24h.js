var hours = []
var temp = []

var chart24h = $("#ch1");

chart24h.append(
  "<canvas id='chart24h'></canvas>"
  //"<canvas id='chart24h' width='500' height=300'></canvas>"
); /**/

//█████████████████████████████████████████████████████████████████████████████████
function temp24Hours(data) {
  var i = 0
  for(i; i< 12; i++){
    temp[i] = data[i].AirTemp
    //formatHours = new Date(data[i].createdAt).toLocaleTimeString() affiche hh:mm:ss format 12hrs
    formatHours = new Date(data[i].createdAt).toLocaleTimeString("fr-CA").slice(0,7)
    hours[i] = formatHours
  }

  var heure1 = hours[0];
  var heure2 = hours[1];
  var heure3 = hours[2];
  var heure4 = hours[3];
  var heure5 = hours[4];
  var heure6 = hours[5];
  var heure7 = hours[6];
  var heure8 = hours[7];
  var heure9 = hours[8];
  var heure10 = hours[9];
  var heure11 = hours[10];
  var heure12 = hours[11];

  var temp1 = temp[0]
  var temp2 = temp[1]
  var temp3 = temp[2]
  var temp4 = temp[3]
  var temp5 = temp[4]
  var temp6 = temp[5]
  var temp7 = temp[6]
  var temp8 = temp[7]
  var temp9 = temp[8]
  var temp10 = temp[9]
  var temp11 = temp[10]
  var temp12 = temp[11]
 

  var ctx = $("#chart24h");
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        heure1,
        heure2,
        heure3,
        heure4,
        heure5,
        heure6,
        heure7,
        heure8,
        heure9,
        heure10,
        heure11,
        heure12,
      ],
      datasets: [
        {
          label: "Temperature 24h",
          data: [
            temp1,
            temp2,
            temp3,
            temp4,
            temp5,
            temp6,
            temp7,
            temp8,
            temp9,
            temp10,
            temp11,
            temp12,
          ],
          backgroundColor: ["rgba(255, 99, 132, 0)"],
          borderColor: ["#F03E3E"],
          borderWidth: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  var testCalcul = $("#gaugeRow1").height();
  var gaugeGauche2 = $("#gaugeGauche2").height();
  var heighttotal = gaugeGauche2 + (testCalcul - gaugeGauche2);
  console.log(heighttotal);

  $("#chartsRow1").height(heighttotal);
}