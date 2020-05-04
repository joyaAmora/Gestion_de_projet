var fanstatus = $("#fanstatus");
var obj;

fanstatusfnct();

async function fanstatusfnct() {
  const response = await fetch("/tempgauge1", {});
  const json = await response.json();
  obj = json.FanStatus;

  if (obj == "ON") {
    fanstatus.append("<span>Fan: </span><span class='statusON'>ON</span>");
  }

  if (obj == "OFF") {
    fanstatus.append("<span>Fan: </span><span class='statusOFF'>OFF</span>");
  }
}
