var hours = []
var temp = []
var heure1
var heure2
var heure3
var heure4
var heure5 
var heure6 
var heure7
var heure8 
var heure9 
var heure10 
var heure11 
var heure12

//---------------------------

var temp1 
var temp2
var temp3 
var temp4 
var temp5 
var temp6 
var temp7 
var temp8 
var temp9 
var temp10 
var temp11
var temp12 
//---------------------------

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
    formatHours = new Date(data[i].createdAt).toLocaleTimeString()
    hours[i] = formatHours
  }

  heure1 = hours[0];
  heure2 = hours[1];
  heure3 = hours[2];
  heure4 = hours[3];
  heure5 = hours[4];
  heure6 = hours[5];
  heure7 = hours[6];
  heure8 = hours[7];
  heure9 = hours[8];
  heure10 = hours[9];
  heure11 = hours[10];
  heure12 = hours[11];

  temp1 = temp[0]
  temp2 = temp[1]
  temp3 = temp[2]
  temp4 = temp[3]
  temp5 = temp[4]
  temp6 = temp[5]
  temp7 = temp[6]
  temp8 = temp[7]
  temp9 = temp[8]
  temp10 = temp[9]
  temp11 = temp[10]
  temp12 = temp[11]
 

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