
void setup() {
  pinMode(13, OUTPUT);    // sets the digital pin 13 as output == D7
  Serial.begin(115200);
}

void loop() {
  digitalWrite(13, HIGH); // sets the digital pin 13 on
Serial.print("Ventilateur on \n " );
  delay(2000);            // attend 2 sec
  digitalWrite(13, LOW);  // sets the digital pin 13 off
   Serial.print("Ventilateur off \n" );
  delay(2000);            // attend 2 sec
}

//https://www.arduino.cc/reference/en/language/functions/digital-io/pinmode/
