var humidity = []
var hour = []
//---------------------------

var chartHumidity = $("#ch2");

chartHumidity.append(
  "<canvas id='chartHumidity'></canvas>"
  //"<canvas id='chartHumidity' width='500' height=300'></canvas>"
);


function humid24Hours(data) {
  var i = 0
  for(i; i< 12; i++){
    humidity[i] = data[i].AirHum
    //formatHour = new Date(data[i].createdAt).toTimeString().slice(0,5)
    formatHour = new Date(data[i].createdAt).toLocaleTimeString("fr-CA").slice(0,7)
    hour[i] = formatHour
  }

    var heure1 = hour[0];
    var heure2 = hour[1];
    var heure3 = hour[2];
    var heure4 = hour[3];
    var heure5 = hour[4];
    var heure6 = hour[5];
    var heure7 = hour[6];
    var heure8 = hour[7];
    var heure9 = hour[8];
    var heure10 = hour[9];
    var heure11 = hour[10];
    var heure12 = hour[11];

    var humidity1 = humidity[0];
    var humidity2 = humidity[1];
    var humidity3 = humidity[2];
    var humidity4 = humidity[3];
    var humidity5 = humidity[4];
    var humidity6 = humidity[5];
    var humidity7 = humidity[6];
    var humidity8 = humidity[7];
    var humidity9 = humidity[8];
    var humidity10 = humidity[9];
    var humidity11 = humidity[10];
    var humidity12 = humidity[11];

  var ctx2 = $("#chartHumidity");
  var myChart2 = new Chart(ctx2, {
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
          label: "Humidity 24h",
          data: [
            humidity1,
            humidity2,
            humidity3,
            humidity4,
            humidity5,
            humidity6,
            humidity7,
            humidity8,
            humidity9,
            humidity10,
            humidity11,
            humidity12,
          ],
          backgroundColor: ["rgba(255, 99, 132, 0)"],
          borderColor: ["rgba(0, 128, 255, 1)"],
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

  $("#chartsRow2").height(heighttotal);
}