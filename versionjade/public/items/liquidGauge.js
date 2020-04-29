var waterLevelID = $("#gg3");
waterLevelID.append(
  "<canvas id='waterGauge' width='130' height='130'></canvas><div id='numberWater'></div><div id='waterFillGap'></div>"
);

//liquidGauge();

//████████████████████████████████████████████████████████████████

/*async function liquidGauge() {
  const response = await fetch("/api", {});
  const json = await response.json();
  obj = json.waterSensor;
  console.log("json.waterSensor = ", obj);
*/
//////////////////////////////////////////////////////////////

var waterSensor = 100;

/*var waterLevelID = $("#gg3");
  waterLevelID.append(
    "<canvas id='waterGauge' width='130' height='130'></canvas><div id='numberWater'></div><div id='waterFillGap'></div>"
  );
  */

var numberWater = $("#numberWater");
var waterFillGap = $("#waterFillGap");
//numberWater.append(waterSensor + "%");
/*waterLevelID.css("width", 155);
waterLevelID.css("height", 155);
numberWater.css("text-align", "center");
numberWater.css("margin-top", -60);
numberWater.css("font-weight", "bold");
waterFillGap.css("margin-top", 30);*/

$("#waterGauge").waterbubble({
  // bubble size
  radius: 73,

  // border width
  lineWidth: 4,

  // data to present
  data: waterSensor / 100,

  // color of the water bubble
  waterColor: "RGBA(0, 128, 255, 1)",

  // text color
  textColor: "rgba(06, 85, 128, 1)",

  // custom font family
  font: "",

  // show wave
  wave: true,

  // custom text displayed inside the water bubble
  txt: waterSensor.toString() + "%",

  // enable water fill animation
  animation: false,
});

////////////////////////////////////////////

//████████████████████████████████████████████████████████████████
