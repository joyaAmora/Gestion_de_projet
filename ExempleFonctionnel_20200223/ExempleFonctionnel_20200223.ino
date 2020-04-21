// Example testing sketch for various DHT humidity/temperature sensors
// Written by ladyada, public domain

// REQUIRES the following Arduino libraries:
// - DHT Sensor Library: https://github.com/adafruit/DHT-sensor-library
// - Adafruit Unified Sensor Lib: https://github.com/adafruit/Adafruit_Sensor


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

//-----------Definitions et fonction---------------------------------------------

#define DHTPIN 14     // Digital pin connected to the DHT sensor
// Feather HUZZAH ESP8266 note: use pins 3, 4, 5, 12, 13 or 14 --
// Pin 15 can work but DHT must be disconnected during program upload.

#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321
#define SEALEVELPRESSURE_HPA (1013.25) // pas necessaire

DHT dht(DHTPIN, DHTTYPE);

// -------------------Variables----------------------
const char* ssid     = "Chebelechaaaaaa!"; //login du wifi
const char* password = "Pinguicula5!"; //mdp du wifi
const char* serverName = "http://projet.davegrenier.com/post-esp-data.php"; //hosting site a dave
//const char* serverName1 = "http://192.168.0.103/testing.php"; //hosting site a dave
String apiKeyValue = "1"; //necessaire pour php

String sensorName = "DHT22"; //pas necassaire pour le moment
String sensorLocation = "Sous-sol"; //Donne l'endroit

//--------------Démarrage--------------------------------
void setup() {
  Serial.begin(115200);; //baud du port de com
  Serial.println(F("DHT22 test!"));

  
  WiFi.begin(ssid, password);
  Serial.println("En connexion...");
  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connecté au WiFi network avec l'adresse IP: ");
  Serial.println(WiFi.localIP());

  dht.begin();
}

//--------------Programme--------------------------------
void loop() {

   if(WiFi.status()== WL_CONNECTED){
    HTTPClient http;
    
    // Domaine ou IP avec path
    http.begin(serverName);
    
    // Specify content-type header
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // Requete de donnees HTTP POST 
    String httpRequestData = "api_key=" + apiKeyValue + "&sensor=" + sensorName
                          + "&location=" + sensorLocation + "&value1=" + String(dht.readTemperature())
                          + "&value2=" + String(dht.readHumidity()) + "&value3=" + String(dht.readTemperature()) + "";
    Serial.print("httpRequestData: ");
    Serial.println(httpRequestData);

//Lecture par le DHT Sensor
  float h = dht.readHumidity();
  float t = dht.readTemperature();


  // Vérification des données
  if (isnan(h) || isnan(t) {
    Serial.println(F("Erreur de lecture des données du sensor"));
    return;
  }
/*
  // Compute heat index in Fahrenheit (the default)
  float hif = dht.computeHeatIndex(f, h);
  // Compute heat index in Celsius (isFahreheit = false)
  float hic = dht.computeHeatIndex(t, h, false);*/

  Serial.print(F("Humidity: "));
  Serial.print(h);
  Serial.print(F("%  Temperature: "));
  Serial.print(t);
  Serial.print(F("°C "));

  int httpResponseCode = http.POST(httpRequestData);
        
    if (httpResponseCode>0) {
      Serial.print("code de réponse HTTP : ");
      Serial.println(httpResponseCode);
    }
    else {
      Serial.print("Code d'erreur: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }
  else {
    Serial.println("WiFi Déconnecté");
  }
  //Envoyer des données au serveur a chaque 30 min
  delay(1800000);  
}
