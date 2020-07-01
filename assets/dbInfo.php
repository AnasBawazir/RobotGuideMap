<?php
$dbPass="0567790375";
$dbUser="Anas";
$dbServer="localhost";
$dbName="phptest";

$connection=new mysqli($dbServer,$dbUser,$dbPass,$dbName);

//checking database connection
if ($connection->connect_error){
    exit("database has error ".$connection->connect_error );
}



?>