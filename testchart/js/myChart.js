var ctx = $("#myChart");
var lesdatas = 35;
var gauge1 = $("#tempGauge");

$(document).ready(
  setInterval(function() {
    var opts = {
      angle: -0.2, // The span of the gauge arc
      lineWidth: 0.2, // The line thickness
      radiusScale: 1, // Relative radius
      percentColors: [
        [0.0, "#a9d70b"],
        [0.5, "#f9c802"],
        [1.0, "#ff0000"]
      ],
      animation: false,
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: "#000000" // Fill color
      },
      limitMax: false, // If false, max value increases automatically if value > maxValue
      limitMin: false, // If true, the min value of the gauge will be fixed
      colorStart: "#6FADCF", // Colors
      colorStop: "#8FC0DA", // just experiment with them
      strokeColor: "#E0E0E0", // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true, // High resolution support
      staticLabels: {
        font: "10px sans-serif", // Specifies font
        labels: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45], // Print labels at these values
        color: "#000000", // Optional: Label text color
        fractionDigits: 0 // Optional: Numerical precision. 0=round off.
        //----
      }
    };
    var target = document.getElementById("tempGauge"); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 50; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 1; // set animation speed (32 is default value)
    gauge.set(lesdatas); // set actual value

    Gauge = new Gauge(document.getElementById("tempGauge"));
    Gauge.setTextField(document.getElementById("numbertemp"));
    Gauge.maxValue = 45;
    Gauge.set(lesdatas);

    //----------------------------------------------------------------
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Simon perron"],
        datasets: [
          {
            label: "temperature",
            data: [lesdatas],
            backgroundColor: ["rgba(44, 242, 130, 1)"],
            borderColor: ["rgba(255, 99, 132, 1)"],
            borderWidth: 1
          }
        ]
      },
      options: {
        animation: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                suggestedMin: 0,
                suggestedMax: 30
              }
            }
          ]
        }
      }
    });
  }, 100)
);

//-------------------------------------------------------

var ctx2 = $("#myChart2");

var myChart = new Chart(ctx2, {
  type: "line",
  data: {
    labels: [
      "0:00",
      "1:00",
      "2:00",
      "3:00",
      "4:00",
      "5:00",
      "6:00",
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00"
    ],
    datasets: [
      {
        label: "Historique temperature (Journée)",
        data: [0, 17, 26, 23, 16, 14, 16, 18, 14, 19, 25, 23, 12, 15, 26, 30],
        backgroundColor: ["rgba(44, 242, 130, 0.2)"],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)"
        ],
        borderWidth: 1
      }
    ]
  },
  options: {}
});
