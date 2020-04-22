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

var temp1 = 22.3;
var temp2 = 22.4;
var temp3 = 21.7;
var temp4 = 21.0;
var temp5 = 20.7;
var temp6 = 20.6;
var temp7 = 20.1;
var temp8 = 19.8;
var temp9 = 19.0;
var temp10 = 23.8;
var temp11 = 24.1;
var temp12 = 25.9;
//---------------------------

var chart24h = $("#ch1");

chart24h.append(
  "<canvas id='chart24h'></canvas>"
); /*chart24h.append("<canvas id='chart24h' width='500' height=300'></canvas>");*/

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
      heure12
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
          temp12
        ],
        backgroundColor: ["rgba(255, 99, 132, 0)"],
        borderColor: ["#F03E3E"],
        borderWidth: 4
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  }
});

var testCalcul = $("#gaugeRow1").height();
var gaugeGauche2 = $("#gaugeGauche2").height();
var heighttotal = gaugeGauche2 + (testCalcul - gaugeGauche2);
console.log(heighttotal);

$("#chartsRow1").height(heighttotal);
