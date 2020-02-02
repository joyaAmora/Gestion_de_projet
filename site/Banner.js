$("#vent1OFF").hide();
$("#vent1PROBLEM").hide();
$("#vent2ON").hide();
$("#vent2PROBLEM").hide();
$("#pompeON").hide();
$("#pompeOFF").hide();
$("#heaterOFF").hide();
$("#heaterPROBLEM").hide();

var ctx = document.getElementById("tempChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["3AM", "4AM", "6AM", "7AM", "8AM", "9AM"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 3, 24, 14, 8, 19],
        /*backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],*/
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
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

var ctx = document.getElementById("humidityChart");
var myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["3AM", "4AM", "6AM", "7AM", "8AM", "9AM"],
    datasets: [
      {
        label: "# of Votes",
        data: [1, 3, 24, 14, 8, 19],
        /*backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],*/
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {
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
