<?php
class dht22{
 public $link='';
 function __construct($temperature, $humidity){
  $this->connect();
  $this->storeInDB($temperature, $humidity);
 }
 
 function connect(){
  $this->link = mysqli_connect('projet.davegrenier.com/phpmyadmin','tommy','ymmot') or die('Cannot connect to the DB');
  mysqli_select_db($this->link,'testing') or die('Cannot select the DB');
 }
 
 function storeInDB($temperature, $humidity){
  $query = "insert into dht22 set humidity='".$humidity."', temperature='".$temperature."'";
  $result = mysqli_query($this->link,$query) or die('Errant query:  '.$query);
 }
 
}
if($_GET['temperature'] != '' and  $_GET['humidity'] != ''){
 $dht22=new dht22($_GET['temperature'],$_GET['humidity']);
}
?>