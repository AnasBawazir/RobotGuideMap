<?php
require "dbInfo.php";

// just if you do want php works without js but this in middle class html and make it form
/*if (isset($_GET['move'])){
    $btnMove=$_GET['move'];
    $query= "INSERT INTO `Moves` ( `move`) VALUES ( '$btnMove')";
    $connection->query($query);
}*/

    $btnDir=$_POST['direction'];
    $binDis=$_POST['distance'];
    if ($_POST['distance'] >= 1){
        $query= "INSERT INTO `movement` ( `distance`, `direction`) VALUES ( '$binDis','$btnDir' )";
        $connection->query($query);
        print_r($_POST["distance"]."m ".$_POST["direction"]);
        $connection->close();
    }
    else {
        echo "please enter a distance to move";

    }

