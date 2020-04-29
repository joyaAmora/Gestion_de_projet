//Sources: 
 //https://www.instructables.com/id/NodeMCU-Basic-Project-Blink-a-LED/ //pour wiring
//https://www.youtube.com/watch?v=EQysbOq_4go //pour fetcher le temps reel sur internet
//https://www.pjrc.com/teensy/td_libs_Time.html //utilisation de Time.h
//utilisation l'exemple de la librairie timealarm.h pour les alarms et template

/*---------------- Includes ---------------------------------------*/
#include <ESP8266WiFi.h> //gestion du WiFi
#include <TimeLib.h>
#include <TimeAlarms.h>
/*---------------- Defines ---------------------------------------*/
#define LED D0  

/*---------------- Constantes ---------------------------------------*/
const char* ssid = "******";
const char* password = "********";

/*---------------- Variables ---------------------------------------*/
bool initTime = false;
int timezone = -4 * 3600;
int dst = 0;
int i = 15; //utiliser pour un countdown pour laisser le temps au node d'aller fetcher les données sur internet PENDANT la fonction setup sinon ca ne marche pas
int h,m,s,y,mn,d;
AlarmId id;




/*********************************************************/
/*********************************************************/




void setup() {
  Serial.begin(9600);
  pinMode(LED, OUTPUT);    
 

  /**************************************/
  // Connexion au WiFi
  /**************************************/
  
  Serial.print("Connection à ");
  Serial.println(ssid);

  WiFi.begin(ssid,password);

  Serial.println();
  Serial.print("Connexion...");

  while(WiFi.status() != WL_CONNECTED) { 
    delay(500);
    Serial.println(".");
  }
 
  Serial.println("Connecté au WiFi avec succès!");
  Serial.print("Adresse IP du NodeMCU : ");
  Serial.println(WiFi.localIP());

  configTime(timezone, dst, "pool.ntp.org", "time.nist.gov"); //envoi le fuseau horaire, chg d'heure vers des sites de références pour obtenir l'heure actuelle
  Serial.println("En attente de reponse");

  while(!time(nullptr)){
      delay(1000);
      Serial.println(".");
    }
    Serial.println("Données horaire recues!");

    
/*******************************************************/
  /**************************************/
  // fetcher le temps sur internet
  /**************************************/
  /**********************/
  //Attention!!  Le setTime doit absolument etre dans le setup. On doit donc obtenir le temps réel dans cette portion, autrement, la librairie n'en tient pas compte et les alarmes ne fonctionnement pas même s'il affiche le bon temps par la suite.
  /**********************/

  
  while(i>1) //pourrait éventuellement adapter et mettre while (h == null ou h == 0), permet d'obtenir les données sur internet, sinon il part à 0:00, décommenter les serial pour debogage
  {
    time_t now = time(nullptr);
    struct tm* p_tm = localtime(&now); //structure contenant les variables de temps

    h = p_tm->tm_hour;
    //Serial.println(h);
    //Serial.println(":");
    
    m= p_tm->tm_min;
    //Serial.println(m);
    //Serial.println(":");
    
    s= p_tm->tm_sec;
    //Serial.println(s);
    //Serial.println(",");
    
    d= p_tm->tm_mday;
    mn= p_tm->tm_mon+1;
    y= p_tm->tm_year + 1900;
    
    i--;
    
    //Serial.print("i = ");
    //Serial.print(i);
    //Serial.println(" ");
    delay(1000);
    
    }
    setTime(h,m,s,mn,d,y);


  /****************************************/
  // Création des alarmes
  /****************************************/
  
  Alarm.alarmRepeat(8,8,00,Ouverture);  // 7:00
  Alarm.alarmRepeat(20,00,00,Fermeture);  // 20:00

}


/*********************************************************/
/*********************************************************/

void loop() {

  digitalClockDisplay(); //affiche l'heure dans le port serie, 
  Alarm.delay(1000); // 1 sec
}



/*********************************************************/
/*********************************************************/
// fonctions pour alarmes:
/*********************************************************/
/*********************************************************/


void Ouverture() {
  Serial.println("Alarme: - ouvrir les lumières");
      digitalWrite(D0, HIGH);
}

void Fermeture() {
  Serial.println("Alarme: - fermer les lumières");
      digitalWrite(D0, LOW);
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
