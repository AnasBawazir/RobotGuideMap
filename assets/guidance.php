<?php
require "dbInfo.php";
$movesNum=(int)$_POST['moves'];
$returnMoves=array();
$queryGetMoves= "SELECT * FROM (SELECT * FROM movement ORDER BY id DESC LIMIT $movesNum) sub ORDER BY id ASC";
$movesObj = ($connection->query($queryGetMoves));
if ($movesObj->num_rows > 0){
    while ($movesRow= mysqli_fetch_array($movesObj)){
        $id=$movesRow['id'];
        $distance=$movesRow['distance'];
        $direction=$movesRow['direction'];

        $returnMoves[]=array("id"=>$id,"distance"=>$distance,"direction"=>$direction);
    }

}
echo json_encode($returnMoves);