
<?php

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

while($row = mysql_fetch_array($result))
{
	$name =strip_tags(mysql_real_escape_string($row['name']));
	$name= str_replace(',', '',$name);
	$name= str_replace(';', '',$name);
	$name= str_replace('?', '',$name);
	echo "".$name .";,;". ($row['bestScore']  ).";,;";
}
 
mysql_close($con);
?>