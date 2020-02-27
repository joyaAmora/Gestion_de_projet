//-------------------
var dirtHumidity = 44;
//-------------------

$("#maindiv").append(
  "<canvas id='myChart' width='155' height='155'></canvas></div>"
);
var numberHumidity = $("#myChart");
$("#maindiv").css("width", 155);
$("#maindiv").css("height", 155);

var ctx = document.getElementById("myChart");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Eau dans le réservoir"],
    datasets: [
      {
        label: dirtHumidity + "%",
        data: [dirtHumidity],
        backgroundColor: ["RGBA(0, 128, 255, 1)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 0
      }
    ]
  },
  plugins: [ChartDataLabels],
  options: {
    legend: {
      display: false
    },
    tooltips: {
      enabled: false
    },
    animation: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 100
          }
        }
      ]
    }
  }
});
