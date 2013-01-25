<?php
//jsonp is the REQUIRED datatype if the php files are hosted on a different server.

require 'connection.php'; //makes connection to database

$uid=0;
if( isset($_GET['uid'])){
	$uid= strip_tags(mysql_real_escape_string($_GET['uid']));
}

$result = mysql_query("SELECT name, MAX(score) as bestScore
		FROM`tracking`
		WHERE uid= ".$uid."
		GROUP BY name
		ORDER BY bestScore  DESC LIMIT 0 , 10");

$returnValues;
$returnValue['val']='';


while($row = mysql_fetch_array($result))
{
	$name =strip_tags(mysql_real_escape_string($row['name']));
	$name= str_replace(',', '',$name);
	$name= str_replace(';', '',$name);
	$name= str_replace('?', '',$name);
	$returnValue['val'] .= "<div class='hsRow'><div class='hsName'>".$name ."</div><div class='hsScore'>". ($row['bestScore']  )."</div></div>";
}

//preppend 'callback' to make it jsonp dataType.
echo $_GET['callback'] . '('. json_encode($returnValue).')';


mysql_close($con);
?>