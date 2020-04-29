
//---------------Librairies------------------------------------------------
#ifdef ESP32
  #include <WiFi.h>
  #include <HTTPClient.h>
#else
  #include <ESP8266WiFi.h>
  #include <ESP8266HTTPClient.h>
  #include <WiFiClient.h>
#endif

#include <Wire.h>
#include "DHT.h"

#include <TimeLib.h>
#include <ESP8266WiFi.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>

//-------------------Variables de connexion
const char* ssid     = "*****";
const char* password = "*****";
const char* host = "*****";//localhost


//***variables pour Temperature/humidité de l'air DHT22***********************************
#define DHTPIN 14     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

DHT dht(DHTPIN, DHTTYPE);


//***variables pour humidite du sol****************************************************
//# define sensorPin A0 attention lorsquon change de carte...
int val; // utilisé pour la calibration
int AirValue = 865; //valeur de la sonde a sec à l'air libre lors de la calibration initiale
int WaterValue = 485; //valeur de la sonde dans un verre d'eau lors de la calibration initiale
int intervals = (AirValue - WaterValue)/3; // intervalle pour décider si humide ou sec
int soilMoistureValue = 0;
float CurrentSoilMoisture;//%, entre 0 et 1 
/************************************************************************/



void setup() {
//pinMode(sensorPin, INPUT);
pinMode(13, OUTPUT);    // sets the digital pin 13 as output == D7
  
  Serial.begin(115200);
  //delay(10);
  //pinMode(A0, INPUT);

  
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
   delay(500);
   Serial.print(".");
  }

  Serial.println("");
  Serial.println("Connecté au WiFi ");  
  Serial.println("Adresse IP: ");
  Serial.println(WiFi.localIP());

    dht.begin(); //pour la sonde temperature dht22
}

/***************************************************************/
void loop() {
  /*****************************************/
 delay(5000);
 
//********************************************************************************************************************************************************/
//********************************************************************************************************************************************************/
//Acquisition des données
//********************************************************************************************************************************************************/
//*********************************************************************************************************************************************************/

// Humidité du Sol (Capacitive Soil Moisture Sensor v.1.2)

soilMoistureValue = analogRead(A0); //lecture de la sonde dans le sol
    Serial.println("Valeur sol avant correction");
    Serial.println(soilMoistureValue);
if (soilMoistureValue <  WaterValue) {soilMoistureValue = WaterValue+1;}//pour eviter les division par 0
if (soilMoistureValue >  AirValue) {soilMoistureValue = AirValue-1;}

//100% humidité == 310, 0% == 572 (plus cest haut plus c'est sec). 262 pts a diviser sur une echelle de 100, donc 2,62 pts par %. Si on adapte:
CurrentSoilMoisture = 100+(WaterValue-soilMoistureValue)/3.8; //ex: 441 serait 50%. (100+(310-441)/2.62)/100 = 0.50
 Serial.println("Lecture capteur sol : ");
  Serial.println(soilMoistureValue);
    Serial.println("Humidité du sol (%) : ");
    Serial.println(CurrentSoilMoisture*100);

if(soilMoistureValue > WaterValue && soilMoistureValue < (WaterValue + intervals))
  {
    Serial.println("Très humide");
  }
else if(soilMoistureValue > (WaterValue + intervals) && soilMoistureValue< (AirValue - intervals))
  {
    Serial.println("OK");
  }
else if(soilMoistureValue < AirValue && soilMoistureValue > (AirValue - intervals))
 {
  Serial.println("Sec");
 }





//Temperature et humidite de l'air (Sensor DHT22)

  float CurrentAirHum = dht.readHumidity();
  float CurrentAirTemp = dht.readTemperature();

  // Vérification des données
  if (isnan(CurrentAirHum) || isnan(CurrentAirTemp)) {
    Serial.println(F("Erreur de lecture des données du sensor DHT22"));
    return;
  }




//Lumiere (LED)
char LightStatus[5] = "ON";








//Ventilateur 12V
char FanStatus[5] = "OFF";
 // digitalWrite(13, HIGH); // sets the digital pin 13 on
  //FanStatus = "ON";
  //Serial.print("Ventilateur on \n " );
  //delay(2000);            // attend 2 sec
  digitalWrite(13, LOW);  // sets the digital pin 13 off
   //FanStatus = "OFF";
  Serial.print("Ventilateur off \n" );
  //delay(2000);            // attend 2 sec

 
/*******************************************/
 //Connection au Serveur
 /******************************************/

 Serial.print("Connexion à ");
 Serial.println(host);

 //*********************************************/
 // Envoi des données au serveur
 //**********************************************************/
 WiFiClient client;
 const int httpPort = 3000;
 if (!client.connect(host, httpPort)) {
  Serial.println("La connexion a échouée");
  return;
 }

 // We now create a URI for the request
 String url = "/"; //mettre le path ici de la route

 Serial.print("Requete du URL: ");
 Serial.println(url);
String data = "AirTemp=" + String(CurrentAirTemp)
            +"&AirHum=" + String(CurrentAirHum)
            +"&SolHum=" + String(CurrentSoilMoisture)
            +"&FanStatus=" + FanStatus 
            + "&LightStatus=" + LightStatus;

  Serial.print(F("Humidité de l'air: "));
  Serial.print(CurrentAirHum);
  Serial.print(F("%  Temperature de l'air: "));
  Serial.print(CurrentAirTemp);
  Serial.print(F("°C Humidité du sol"));
  Serial.print(CurrentSoilMoisture);
  Serial.print(F("°% État du ventilateur "));
  Serial.print(FanStatus);
  Serial.print(F("°% État de la lumière "));
  Serial.print(LightStatus);

   Serial.print("Requesting POST: ");
   // Send request to the server:
   client.println("POST / HTTP/1.1");
   client.println("Host: server_name");
   client.println("Accept: */*");
   client.println("Content-Type: application/x-www-form-urlencoded");
   client.print("Content-Length: ");
   client.println(data.length());
   client.println();
   client.print(data);


   
 // This will send the request to the server
 /*this is a get method working*/
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
           "Connection: close\r\n\r\n");
 unsigned long timeout = millis();
 while (client.available() == 0) {
 if (millis() - timeout > 5000) {
  Serial.println(">>> Client Timeout !");
  client.stop();
  return;
 }
}




 // Read all the lines of the reply from server and print them to Serial
 while(client.available()){
  String line = client.readStringUntil('\r');
  Serial.print(line);
 }

 Serial.println();
 Serial.println("closing connection");
 delay(3000);  //Lecture et nvoi des données aux 30 min 1800000
}
