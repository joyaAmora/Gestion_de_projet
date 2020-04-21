
int val; // utilisé pour la calibration
int Air = 572; //valeur de la sonde a sec à l'air libre lors de la calibration initiale
int Eau = 310; //valeur de la sonde dans un verre d'eau lors de la calibration initiale
int intervals = (Air - Eau)/3; // intervalle pour décider si humide ou sec
int soilMoistureValue = 0;
int ActualMoisture;//%, entre 0 et 1

void setup() {
Serial.begin(9600); // lecture sur port serie avec un baud rate de 9600 bps
}

/*
Ajustement plus fins: il faudrait tester sur des plantes en quasi-sécheresse pour estimer le treshold où on juge que la plante a soif. Peut varier selon les genres de plantes et le type de sol

Envoi d'un notification par courriel lorsque sec? A voir

Fil gauche a droite A0/5v/grd
pin A0 pour la lecture
5V pour power... uno ou breadboard

*/
void loop() {

//Pour calibration, décommenter les lignes ci-bas pour avoir une valeur à l'air et une valeur à l'eau sur le port serie.

/* 
val = analogRead(0); //connect sensor to Analog 0
Serial.print(val); //print the value to serial port
Serial.print(" \n"); //print the value to serial port
delay(100);
*/

soilMoistureValue = analogRead(A0); //lecture de la sonde dans le sol

if (soilMoistureValue <  WaterValue) {soilMoistureValue = WaterValue+1;}//pour eviter les division par 0
if (soilMoistureValue >  AirValue) {soilMoistureValue = AirValue-1;}

//100% humidité == 310, 0% == 572 (plus cest haut plus c'est sec). 262 pts a diviser sur une echelle de 100, donc 2,62 pts par %. Si on adapte:
AcTualMoisture = 100+(WaterValue-soilMoistureValue)/2.62 //ex: 441 serait 50%. (100+(310-441)/2.62)/100 = 0.50
    Serial.println("Humidité du sol (%) :", AcTualMoisture * 100);

if(soilMoistureValue > WaterValue && soilMoistureValue < (WaterValue + intervals))
  {
    Serial.println("Très humide");
  }
else if(soilMoistureValue > (WaterValue + intervals) && soilMoistureValue
< (AirValue - intervals))
  {
    Serial.println("OK");
  }
else if(soilMoistureValue < AirValue && soilMoistureValue > (AirValue - intervals))
 {
  Serial.println("Sec");
  
 }
delay(100);

}
