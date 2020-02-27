//----------------------
var humiditySensor1 = 35;
//----------------------

//----------------------------------------
//---------Texte sous le gauge------------
$("#maindiv").append(
  "<canvas id='humidityGauge' width='155' height='155'></canvas><div id='numberHumidity'></div>"
);

var numberHumidity = $("#numberHumidity");
numberHumidity.append(humiditySensor1 + "%");
$("#maindiv").css("width", 155);
$("#maindiv").css("height", 155);
numberHumidity.css("text-align", "center");
numberHumidity.css("margin-top", -60);
numberHumidity.css("font-weight", "bold");
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
    [0.5, "#A9D70B"],
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
    labels: [1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    color: "#000000",
    fractionDigits: 0
    //----
  }
};

var target = document.getElementById("humidityGauge");
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 100;
gauge.setMinValue(0);
gauge.animationSpeed = 1;
gauge.set(humiditySensor1); //On assigne ici la variable humiditySensor1 comme temperature

//------------------------------------Le gauge lui-même---------------------------------------
//--------------------------------------------------------------------------------------------
