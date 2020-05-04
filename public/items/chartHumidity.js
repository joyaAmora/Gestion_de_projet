var humidity = []
var hour = []

var heure1;
var heure2;
var heure3;
var heure4;
var heure5;
var heure6;
var heure7;
var heure8;
var heure9;
var heure10;
var heure11;
var heure12;

//---------------------------

var humidity1 
var humidity2 
var humidity3 
var humidity4 
var humidity5 
var humidity6
var humidity7 
var humidity8 
var humidity9 
var humidity10 
var humidity11 
var humidity12 
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
    formatHour = new Date(data[i].createdAt).toLocaleTimeString()
    hour[i] = formatHour
  }

    heure1 = hour[0];
    heure2 = hour[1];
    heure3 = hour[2];
    heure4 = hour[3];
    heure5 = hour[4];
    heure6 = hour[5];
    heure7 = hour[6];
    heure8 = hour[7];
    heure9 = hour[8];
    heure10 = hour[9];
    heure11 = hour[10];
    heure12 = hour[11];

    humidity1 = humidity[0];
    humidity2 = humidity[1];
    humidity3 = humidity[2];
    humidity4 = humidity[3];
    humidity5 = humidity[4];
    humidity6 = humidity[5];
    humidity7 = humidity[6];
    humidity8 = humidity[7];
    humidity9 = humidity[8];
    humidity10 = humidity[9];
    humidity11 = humidity[10];
    humidity12 = humidity[11];

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