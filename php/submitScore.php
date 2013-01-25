<?php

require 'connection.php'; //makes connection to database

//Lightly sanitize the GET's to prevent SQL injections and possible XSS attacks
$name ='';
if(isset($_GET['name'])){
	$name =strip_tags(mysql_real_escape_string($_GET['name']));
	$name= str_replace(',', '',$name);
	$name= str_replace(';', '',$name);
}

$uid=0;
if( isset($_GET['uid'])){
	$uid= strip_tags(mysql_real_escape_string($_GET['uid']));

}

$score = strip_tags(mysql_real_escape_string($_GET['score']));

$swearWordsRegex = '/(shit|poop|fuck|cock|tit|boob|cunt|penis|bitch|bastard|shit|whore|dick|asshole)/i' ;
$name= preg_replace($swearWordsRegex,'safe',$name);

$sql = mysql_query("INSERT INTO `tracking`
		(`id`,`name`, `uid`, `location`, `score`, `DateTime`, `episode`,`event`)
		VALUES
		(NULL,'$name', '$uid', 'idleBieber', '$score', NOW(), 'n/a', 'n/a');");
 

if($sql){            //The query returned true - now do whatever you like here.
	echo 'Your score was saved. Congrats! '.$name;
}
else{               //The query returned false - you might want to put some sort of error reporting here. Even logging the error to a text file is fine.
	echo 'There was a problem saving your score. Please try again later.';
}

mysql_close($con);
?>