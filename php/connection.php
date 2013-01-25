<?php
	$dbName='your db name';
	$dbUser="your db user";
	$dbPwd="your db user password";

	$con = mysql_connect("localhost",$dbUser,$dbPwd);
	 if (!$con)
	   {
	   die('Could not connect: ' . mysql_error());
	   }

	mysql_select_db($dbName, $con);
?>
