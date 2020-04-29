var heure1 = "5:00";
var heure2 = "7:00";
var heure3 = "9:00";
var heure4 = "11:00";
var heure5 = "13:00";
var heure6 = "15:00";
var heure7 = "17:00";
var heure8 = "19:00";
var heure9 = "21:00";
var heure10 = "23:00";
var heure11 = "1:00";
var heure12 = "3:00";

//---------------------------

var humidity1 = 58;
var humidity2 = 50;
var humidity3 = 52;
var humidity4 = 43;
var humidity5 = 51;
var humidity6 = 70;
var humidity7 = 41;
var humidity8 = 57;
var humidity9 = 37;
var humidity10 = 75;
var humidity11 = 71;
var humidity12 = 56;
//---------------------------

var chartHumidity = $("#ch2");

chartHumidity.append(
  "<canvas id='chartHumidity'></canvas>"
  //"<canvas id='chartHumidity' width='500' height=300'></canvas>"
);

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
