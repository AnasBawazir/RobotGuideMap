<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title> Robot Guide Map History </title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <style>
        body {
            background-color: #455a64 !important;
            text-align: center !important;

        }

        .container {
            border: 2px solid white;
        }

        img {
            margin: auto;
        }

        h3 {
            font-family: 'Lato', sans-serif;
            width: 100%;
            margin: 45px auto;
            color: white;
            font-size: 3em;
            font-weight: 300;
            letter-spacing: 0.1em;
        }

        .middle {
            display: block;
            text-align: center;
        }

        .footer {
            margin: 0;
            color: white;
            float: bottom !important;
        }

        table {
            font-family: 'Lato', sans-serif;
            width: 70%;
            color: white;
            font-size: 1em;
            font-weight: 300;
            letter-spacing: 0.1em;
            margin: auto;
        }

        table, td, th {
            border: 1px solid white;
            padding: 3px;
        }

        th {
            left;
        }
    </style>
</head>
<body>
<div class="container pt-3">
    <section>
        <img src="https://s-m.com.sa/images/logo.png" alt="no image">
        <h3>Guide Map History</h3>
    </section>
    <a href="javascript:history.go(-1)">
        <button class=" btn btn-primary btn-map">Back</button>
    </a>
    <div class="middle">
        <?php
        require "dbInfo.php";
        $movesNum = (int)$_POST['moves'];

        $query2 = "SELECT * FROM (SELECT * FROM movement ORDER BY id DESC LIMIT $movesNum) sub ORDER BY id ASC";
        $movesObj = ($connection->query($query2));
        if ($movesObj->num_rows > 0) {
            echo "<table>
<tr>
<th>ID</th>
<th>Distance</th>
<th>Direction</th>
</tr>";
            while ($moveRow = $movesObj->fetch_assoc()) {
                echo "<tr>";
                echo "<td>" . $moveRow['id'] . "</td>";
                echo "<td>" . $moveRow['distance'] . "</td>";
                echo "<td>" . $moveRow['direction'] . "</td>";
                echo "</tr>";
            }
            echo "</table>";
        }
        ?>
    </div>
    <div class="footer">
        <p>By Anas Bawazir © </p>
    </div>
</div>
</body>
</html>
