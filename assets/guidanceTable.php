<!DOCTYPE html>
<html>
<head>
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
        }

        table, td, th {
            border: 1px solid white;
            padding: 3px;
        }

        th {text-align: left;}
    </style>
</head>
<body>

<?php

$movesNum=(int)$_POST['moves'];

$query2= "SELECT * FROM (SELECT * FROM movement ORDER BY id DESC LIMIT $movesNum) sub ORDER BY id ASC";
$movesObj = ($connection->query($query2));
if ($movesObj->num_rows > 0){
echo "<table>
<tr>
<th>ID</th>
<th>Distance</th>
<th>Direction</th>
</tr>";
while($moveRow = $movesObj->fetch_assoc()) {
    echo "<tr>";
    echo "<td>" . $moveRow['id'] . "</td>";
    echo "<td>" . $moveRow['distance'] . "</td>";
    echo "<td>" . $moveRow['direction'] . "</td>";
    echo "</tr>";
}
echo "</table>";
}
?>
</body>
</html>
