<?php 
/*$DB = "jbtv";
$USER = 'root';
$PASS = '';*/
$DB = "332057_app";
$USER = '332057_admin';
$PASS = 'fdn3Fj5eZ6';
$SERVER = 'mysql51-098.wc1.ord1.stabletransit.com';  
$con = mysql_connect($SERVER,$USER,$PASS)or die(mysql_error()); 
mysql_select_db($DB,$con)or die(mysql_error());  

?>
 