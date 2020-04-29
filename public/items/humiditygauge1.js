var idHumid = $("#gg2");
idHumid.append(
  "<center class='datitle'>Air humidity</center><canvas id='humidityGauge' width='155' height='155'></canvas><div id='numberHumidity'></div><div id='humidityFillGap'></div>"
);

humiditySensor1();
//█████████████████████████████████████████████████████████████████████████████████
async function humiditySensor1() {
  const response = await fetch("/tempgauge1", {});

  const json = await response.json();
  obj = json.AirHum;
  console.log("json.humiditySensor1 = ", obj);

  //obj = json.humiditySensor1;
  //console.log("json.humiditySensor1 = ", obj);

  //////////////////////////////////////////////////////////////

  //----------------------
  var humiditySensor1 = obj;
  /*
  var idHumid = $("#gg2");
  //----------------------

  //----------------------------------------
  //---------Texte sous le gauge------------
  idHumid.append(
    "<canvas id='humidityGauge' width='155' height='155'></canvas><div id='numberHumidity'></div><div id='humidityFillGap'></div>"
  );
  */

  var numberHumidity = $("#numberHumidity");
  var humidityFillGap = $("#humidityFillGap");
  numberHumidity.append(humiditySensor1 + "%");
  /*$("#maindiv").css("width", 155);
$("#maindiv").css("height", 155);*/
  numberHumidity.css("text-align", "center");
  numberHumidity.css("margin-top", -60);
  numberHumidity.css("font-weight", "bold");
  humidityFillGap.css("margin-top", 30);
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
      [1.0, "#ff0000"],
    ],
    animation: false,
    pointer: {
      length: 0.6,
      strokeWidth: 0.035,
      color: "#000000",
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
      fractionDigits: 0,
      //----
    },
    staticZones: [
      { strokeStyle: "#F03E3E", min: 0, max: 30 }, // Red from 100 to 130
      { strokeStyle: "#FFDD00", min: 31, max: 40 }, // Red from 100 to 130
      { strokeStyle: "#30B32D", min: 41, max: 60 }, // Yellow
      { strokeStyle: "#FFDD00", min: 61, max: 70 }, // Green
      { strokeStyle: "#0080FF", min: 71, max: 100 }, // Green
    ],
  };

  var target = document.getElementById("humidityGauge");
  var gauge = new Gauge(target).setOptions(opts);
  gauge.maxValue = 100;
  gauge.setMinValue(0);
  gauge.animationSpeed = 1;
  gauge.set(humiditySensor1); //On assigne ici la variable humiditySensor1 comme temperature

  //------------------------------------Le gauge lui-même---------------------------------------
  //--------------------------------------------------------------------------------------------<
  //////////////////////////////////////////////////////////////
}
//█████████████████████████████████████████████████████████████████████████████████
