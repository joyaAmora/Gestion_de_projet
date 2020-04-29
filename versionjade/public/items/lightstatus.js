var lightstatus = $("#light-status");
var obj;

lightstatusfnct();

async function lightstatusfnct() {
  const response = await fetch("/tempgauge1", {});
  const json = await response.json();
  obj = json.LightStatus;

  if (obj == "ON") {
    lightstatus.append("<span>Light: </span><span class='statusON'>ON</span>");
  }

  if (obj == "OFF") {
    lightstatus.append(
      "<span>Light: </span><span class='statusOFF'>OFF</span>"
    );
  }
}
