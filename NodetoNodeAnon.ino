
  /*---------------- Includes ---------------------------------------*/
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
#include <TimeAlarms.h>
#include <TimeLib.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>

/*---------------- Defines ---------------------------------------*/
#define LED D0  

/*---------------- Constantes ---------------------------------------*/
const char* ssid     = "********"; // 
const char* password = "*******";
const char* host = "******";//localhost


//***variables pour Temperature/humidité de l'air DHT22
#define DHTPIN 14     // Digital pin connected to the DHT sensor
#define DHTTYPE DHT22   // DHT 22  (AM2302), AM2321

DHT dht(DHTPIN, DHTTYPE);
float CurrentAirHum;
float CurrentAirTemp;
  
//***variables pour humidite du sol
//# define sensorPin A0 attention lorsquon change de carte...
int val; // utilisé pour la calibration
int AirValue = 865; //valeur de la sonde a sec à l'air libre lors de la calibration initiale
int WaterValue = 485; //valeur de la sonde dans un verre d'eau lors de la calibration initiale
int intervals = (AirValue - WaterValue)/3; // intervalle pour décider si humide ou sec
int soilMoistureValue = 0;
float CurrentSoilMoisture;//%, entre 0 et 1 


//***variables pour lumiere et timer

int timezone = -4 * 3600;
int dst = 0;
int i = 15; //utiliser pour un countdown pour laisser le temps au node d'aller fetcher les données sur internet PENDANT la fonction setup sinon ca ne marche pas
int h,m,s,y,mn,d;
//char LightStatus[5] = "ON";
bool ledonoff= false;

//variable pour timer lumiere
//ouverture 7h00
float Ohour = 7; //Entrer heure /24h sans le 0 si < 10
float Omin = 0; //Entrer minutes /60m sans le 0 si < 10
float Osec = 0; //Entrer secs /60s sans le 0 si < 10
float Olight = (60 * Ohour) + Omin;


//Fermeture 20h00
float Fhour = 20; //Entrer heure /24h sans le 0 si < 10
float Fmin = 0; //Entrer minutes /60m sans le 0 si < 10
float Fsec = 0; //60s sans le 0 si < 10
float Flight = (60 * Fhour) + Fmin;

//***variables pour fan

bool Status;
float TooHot = 25.00; //température jugée trop chaude
float Ideal = 20.00; // température visée
bool onoff = false;
int j =0; //variable incrementée pour gérer le clignotement

/************************************************************************/

void setup() {
  //pinMode(sensorPin, INPUT);
  pinMode(13, OUTPUT);    // sets the digital pin 13 as output == D7
  pinMode(LED, OUTPUT);   //pour LED
  
  Serial.begin(115200);
  
  /**************************************/
  // Connexion au WiFi
  /**************************************/
  
  Serial.println();
  Serial.println();
  Serial.print("Connexion...");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) 
  {
   delay(500);
   Serial.print(".");
  }

  Serial.println("");
  Serial.println("Connecté au WiFi ");  
  Serial.println("Adresse IP: ");
  Serial.println(WiFi.localIP());

  configTime(timezone, dst, "pool.ntp.org", "time.nist.gov"); //envoi le fuseau horaire, chg d'heure vers des sites de références pour obtenir l'heure actuelle
  Serial.println("En attente de reponse");

  while(!time(nullptr))
  {
      delay(1000);
      Serial.println(".");
  }
  Serial.println("Données horaire recues!");

  //Attention!!  Le setTime doit absolument etre dans le setup. On doit donc obtenir le temps réel dans cette portion, autrement, la librairie n'en tient pas compte et les alarmes ne fonctionnement pas même s'il affiche le bon temps par la suite.
  while(i>1) //pourrait éventuellement adapter et mettre while (h == null ou h == 0), permet d'obtenir les données sur internet, sinon il part à 0:00, décommenter les serial pour debogage
  {
      time_t now = time(nullptr);
      struct tm* p_tm = localtime(&now); //structure contenant les variables de temps
  
      h = p_tm->tm_hour;    
      m= p_tm->tm_min;    
      s= p_tm->tm_sec;     
      d= p_tm->tm_mday;
      mn= p_tm->tm_mon+1;
      y= p_tm->tm_year + 1900;
      
      i--;
      
      delay(1000);
    }
    
    setTime(h,m,s,mn,d,y);

  // Création des alarmes
  
  Alarm.alarmRepeat(Ohour,Omin,Osec,Ouverture);  // 7:00
  Alarm.alarmRepeat(Fhour,Fmin,Fsec,Fermeture);  // 20:00
  Alarm.timerRepeat(300, Acquisition);           // timer pour chaque 5 min (300 sec)
  Alarm.timerRepeat(1800, Envoi);           // timer pour chaque 30 min (1800 sec), on ne le gére pas dans Acquisition() car on veut que le fan soit réactif

  //Verification du temps vs alarmes
  float currentTime = (60 * int(hour())) + int(minute());
   if (Olight < Flight) {
      if (Olight <= currentTime < Flight)
      {
          Serial.println("Alarme: - ouvrir les lumières");
          digitalWrite(D0, HIGH);
          ledonoff = true;
      }
      if (Olight > currentTime || Flight <= currentTime)
      {
          Serial.println("Alarme: - fermerr les lumières");
          digitalWrite(D0, LOW);
          ledonoff = false;
      }
    }
    else if (Olight > Flight) {
      if (Olight >= currentTime >= Flight)
      {
          Serial.println("Alarme: - fermerr les lumières");
          digitalWrite(D0, LOW);
          ledonoff = false;
      }
      if (Olight < currentTime || Flight > currentTime)
      {
          Serial.println("Alarme: - ouvrir les lumières");
          digitalWrite(D0, HIGH);
          ledonoff = true;
      }
    }

  // Demarrage du dht22
  
  dht.begin(); //démmarage de la sonde temperature dht22
}


/***************************************************************/
void loop() {

  digitalClockDisplay(); //affiche l'heure dans le port serie
  Alarm.delay(1000); // on boucle a chaque seconde, permet de gérer les timer et clignotement de la lumiere du ventilateur
 
  //****Acquisition des données****//
  //Gérer par alarme Acquisition
  
  //Lumiere (LED)
  //est gérée via le timer
  
  //Ventilateur 12V
  //Est géré hors de le main pour

  if(onoff)
  {
    if(j%2 == 0)//remplace le ventilateur. Si le fan devait marcher, la lumiere clignote
    {
        digitalWrite(13, HIGH);
    }
    else
    {
        digitalWrite(13, LOW);
    }
    j++;
  }
}


//************************************/
//Fonctions
//***********************************/

void Ouverture() 
{
  Serial.println("Alarme: - ouvrir les lumières");
  digitalWrite(D0, HIGH);
  ledonoff = true;
}

void Fermeture() 
{
  Serial.println("Alarme: - fermer les lumières");
  digitalWrite(D0, LOW);
  ledonoff = false;
}

void Acquisition() 
{
  Serial.println("Alarme: - Acquisition de données");
  ReadDHT22();
  ReadSoilMoisture();
  Fan();
}

float ReadDHT22() 
{
  CurrentAirHum = dht.readHumidity();
        Serial.println(CurrentAirHum);
        Serial.println(" %");
  CurrentAirTemp = dht.readTemperature();
        Serial.println(CurrentAirTemp);
        Serial.println(" C");

  // Vérification des données
  if (isnan(CurrentAirHum) || isnan(CurrentAirTemp)) 
  {
    Serial.println(F("Erreur de lecture des données du sensor DHT22"));
    //return;
  }
}

float ReadSoilMoisture() 
{
// Humidité du Sol (Capacitive Soil Moisture Sensor v.1.2)

    soilMoistureValue = analogRead(A0); //lecture de la sonde dans le sol
    Serial.println("Valeur sol avant correction");
    Serial.println(soilMoistureValue);
    
    if(soilMoistureValue <  WaterValue) 
    {
      soilMoistureValue = WaterValue+1;//pour eviter les division par 0
    }
    
    if(soilMoistureValue >  AirValue) 
    {
      soilMoistureValue = AirValue-1;
    }
    
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
}

bool Fan() 
{
  if(CurrentAirTemp >= TooHot)
  {
    onoff = true;
    Serial.println("On part le fan!");
    
  }
  
  if(CurrentAirTemp <= Ideal)
  {
    onoff = false;
    Serial.println("y fait frette, on gele!");
  }
}

void Envoi() 
{
 //Connection au Serveur

   Serial.print("Connexion à ");
   Serial.println(host);

 // Envoi des données au serveur

   WiFiClient client;
   const int httpPort = 3000;
   if (!client.connect(host, httpPort)) 
   {
      Serial.println("La connexion a échouée");
      return;
   }

   String url = "/"; //mettre le path ici de la route
     char LightStatus[5];
     char FanStatus[5];
    if (ledonoff)
    {
      LightStatus[0] = 'O';
      LightStatus[1] = 'N';
      LightStatus[2] = '\0';
    }
    else
    {
      LightStatus[0] = 'O';
      LightStatus[1] = 'F';
      LightStatus[2] = 'F';
      LightStatus[3] = '\0';
    }

    if (onoff)
    {
      FanStatus[0] = 'O';
      FanStatus[1] = 'N';
      FanStatus[2] = '\0';
    }
    else
    {
      FanStatus[0] = 'O';
      FanStatus[1] = 'F';
      FanStatus[2] = 'F';
      FanStatus[3] = '\0';
    }
    
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

  client.println("POST / HTTP/1.1");
  client.println("Host: server_name");
  client.println("Accept: */*");
  client.println("Content-Type: application/x-www-form-urlencoded");
  client.print("Content-Length: ");
  client.println(data.length());
  client.println();
  client.print(data);
 
  client.print(String("GET ") + url + " HTTP/1.1\r\n" + "Connection: close\r\n\r\n");
  unsigned long timeout = millis();
  
  while (client.available() == 0) 
  {
    if (millis() - timeout > 5000) 
    {
       Serial.println(">>> Client Timeout !");
       client.stop();
       return;
    }
  }
  
  while(client.available())
  {
     String line = client.readStringUntil('\r');
     Serial.print(line);
  }
  
  Serial.println();
  Serial.println("closing connection");
}


void digitalClockDisplay() {
  // inclut dans la librairie. Vérifie si a besoin  des 0 en bas de 10 (ex: 01, 02, 03)
  Serial.print(hour());
  printDigits(minute());
  printDigits(second());
  Serial.println();
}

void printDigits(int digits) {   // inclut dans la librairie. Gere les 0 en bas de 10 (ex: 01, 02, 03)
  Serial.print(":");
  if (digits < 10)
    Serial.print('0');
  Serial.print(digits);
}
