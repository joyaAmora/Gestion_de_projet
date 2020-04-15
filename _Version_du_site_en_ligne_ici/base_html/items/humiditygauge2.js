//----------------------
var humiditySensor2 = 85;
var idHumidGround = $("#gg4");
//----------------------

//----------------------------------------
//---------Texte sous le gauge------------
idHumidGround.append(
  "<canvas id='humidityGaugeGround' width='155' height='155'></canvas><div id='numberHumidity2'></div><div id='humidityFillGap2'></div>"
);

var numberHumidity2 = $("#numberHumidity2");
var humidityFillGap2 = $("#humidityFillGap2");
numberHumidity2.append(humiditySensor2 + "%");
/*$("#maindiv").css("width", 155);
$("#maindiv").css("height", 155);*/
numberHumidity2.css("text-align", "center");
numberHumidity2.css("margin-top", -60);
numberHumidity2.css("font-weight", "bold");
humidityFillGap2.css("margin-top", 30);
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
    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    color: "#000000",
    fractionDigits: 0
    //----
  },
  staticZones: [
    { strokeStyle: "#F03E3E", min: 0, max: 30 }, // Red from 100 to 130
    { strokeStyle: "#FFDD00", min: 31, max: 40 }, // Red from 100 to 130
    { strokeStyle: "#30B32D", min: 41, max: 60 }, // Yellow
    { strokeStyle: "#FFDD00", min: 61, max: 70 }, // Green
    { strokeStyle: "#0080FF", min: 71, max: 100 } // Green
  ]
};

var target = document.getElementById("humidityGaugeGround");
var gauge = new Gauge(target).setOptions(opts);
gauge.maxValue = 100;
gauge.setMinValue(0);
gauge.animationSpeed = 1;
gauge.set(humiditySensor2); //On assigne ici la variable humiditySensor2 comme temperature

//------------------------------------Le gauge lui-même---------------------------------------
//--------------------------------------------------------------------------------------------
