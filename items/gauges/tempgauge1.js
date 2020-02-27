//----------------------
var lesdatas = 17;
//----------------------

//----------------------------------------
//---------Texte sous le gauge------------
$("#maindiv").append(
  "<canvas id='tempGauge' width='155' height='155'></canvas><div id='numbertemp'></div>"
);

var numbertemp = $("#numbertemp");
numbertemp.append(lesdatas + "°C");
$("#maindiv").css("width", 155);
$("#maindiv").css("height", 155);
numbertemp.css("text-align", "center");
numbertemp.css("margin-top", -60);
numbertemp.css("font-weight", "bold");
//---------Texte sous le gauge------------
//----------------------------------------

//--------------------------------------------------------------------------------------------
//------------------------------------Le gauge lui-même---------------------------------------

var opts = {
  angle: -0.2,
  lineWidth: 0.2,
  radiusScale: 0.8,
  percentColors: [
    [0.0, "#ff0000"],
    [0.4, "#A9D70B"],
    [1.0, "#ff0000"]
  ],
  animation: false,
  pointer: {
    length: 0.6,
    strokeWidth: 0.035,
    color: "#000000"
  },
  limitMax: false,
  limitMin: false,
  colorStart: "#6FADCF",
  colorStop: "#8FC0DA",
  strokeColor: "#E0E0E0",
  generateGradient: true,
  highDpiSupport: true,
  staticLabels: {
    font: "10px sans-serif",
    labels: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
    color: "#000000",
    fractionDigits: 0
    //----
  }
};

var target = document.getElementById("tempGauge");
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 50;
gauge.setMinValue(0);
gauge.animationSpeed = 1;
gauge.set(lesdatas); //On assigne ici la variable lesdatas comme temperature

//------------------------------------Le gauge lui-même---------------------------------------
//--------------------------------------------------------------------------------------------
