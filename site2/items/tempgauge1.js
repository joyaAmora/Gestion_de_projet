//----------------------
var tempsensor1 = 17;
var idTempName1 = $("#gg1");
//----------------------

//----------------------------------------
//---------Texte sous le gauge------------
idTempName1.append(
  "<canvas id='tempGauge' width='155' height='155'></canvas><div id='numbertemp'></div><div id='tempFillGap'></div>"
);
var numbertemp = $("#numbertemp");
var tempFillGap = $("#tempFillGap");
numbertemp.append(tempsensor1 + "°C");
idTempName1.css("width", 155);
idTempName1.css("height", 155);
numbertemp.css("text-align", "center");
numbertemp.css("margin-top", -60);
numbertemp.css("font-weight", "bold");
tempFillGap.css("margin-top", 30);
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
    //labels: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 100],
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    color: "#000000",
    fractionDigits: 0
    //----
  },
  staticZones: [
    { strokeStyle: "#0080FF", min: 0, max: 15 }, // Red from 100 to 130
    { strokeStyle: "#FFDD00", min: 16, max: 20 }, // Yellow
    { strokeStyle: "#30B32D", min: 21, max: 28 }, // Green
    { strokeStyle: "#FFDD00", min: 29, max: 35 }, // Yellow
    { strokeStyle: "#F03E3E", min: 36, max: 100 } // Red
  ]
};

var target = document.getElementById("tempGauge");
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 100;
gauge.setMinValue(0);
gauge.animationSpeed = 1;
gauge.set(tempsensor1); //On assigne ici la variable tempsensor1 comme temperature

//------------------------------------Le gauge lui-même---------------------------------------
//--------------------------------------------------------------------------------------------
