let moves = 0;

function doMove(direction) {
    var distance = document.getElementById("distance").value;
    if (distance >= 1 && distance <= 10) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "assets/doMovement.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send("direction=" + direction + "&" + "distance=" + distance);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtMove").innerHTML += moves + ". " + this.responseText;
                document.getElementById("txtMove").innerHTML += "<br>";
            }
        };
        moves++;
    } else {
        document.getElementById("txtMove").innerHTML += "please enter a distance to move" + "<br>" + "up to 10 meter!" + "<br>";
    }
}

function getMoves() {
//normal ajax without jquery use to get moves table
    /* var xhr = new XMLHttpRequest();
     xhr.open("POST", "assets/guidanceTable.php", true);
     xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xhr.send("moves=" + moves.toString());
     xhr.onreadystatechange = function () {
         if (this.readyState == 4 && this.status == 200) {
             //var movesGuide=this.response;
             document.getElementById("myCanvas").innerHTML=this.responseType;*/

    if (moves > 0) {

        $.ajax({
            url: 'assets/guidance.php',
            type: 'POST',
            dataType: 'JSON',
            data: "moves=" + moves.toString(),

            success: function (response) {
                var arr_move = response;
                printMoves(arr_move);
                drawMap(arr_move);
            },
            error: function () {
                document.getElementById("myCanvas").innerHTML = "server doesnt works";
            }
        })
    }


}

//////////////////////////////////////////////////////////////////////////////
//no use for this function because I just change the css display of canvas
/*function setCanvas(distance, direction) {
    var canvasDraw = document.createElement("canvas");
    canvasDraw.id = "myCanvas";
    canvasDraw.width = 301;
    canvasDraw.height = 301;
    canvasDraw.style.border = "1px solid white";
    document.body.appendChild(canvasDraw);
    document.getElementById('myCanvas').appendChild(canvasDraw);
}*/

////////////////////////////////////////////////////////////////////////////

function printMoves(arr_moves) {

    /*alert(document.getElementById("printMoves").outerHTML);*/

    document.getElementById("printMoves").innerHTML = "you do " + moves + " moves which are " + "<br>";


    //to print moves before the map or canvas
    /*var len = arr_moves.length;
    for (var i = 0; i < len; i++) {
        var distance = arr_moves[i].distance;
        var direction = arr_moves[i].direction;
            document.getElementById("printMoves").innerHTML += i + 1 + ". " + distance.toString() + " " + direction + "<br>";
        }*/


}

function drawMap(arr_move) {
    document.getElementById("clearing").style.display = "unset";
    document.getElementById("history").style.display = "unset";
    document.getElementById("myCanvas").style.display = "unset";
    var startX = 150;
    var startY = 301;
    var canvasMe = document.getElementById("myCanvas");
    var ctx = canvasMe.getContext("2d");
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    ctx.moveTo(startX, startY);
    var len = arr_move.length;
    for (var i = 0; i < len; i++) {
        var distanceM = arr_move[i].distance * 10;
        var directionM = arr_move[i].direction;

        if (directionM == "forward") {
            startY = startY - distanceM;
        }
        if (directionM == "right") {
            startX = startX + distanceM;
        }
        if (directionM == "left") {
            startX = startX - distanceM;
        }
        ctx.lineTo(startX, startY);
        ctx.stroke();
        ctx.font = "30px Arial ";
        ctx.fillStyle = "white";
        ctx.fillText("●", startX - 8, startY + 8);
    }
}

function clearCanvas() {
    var canvasMe = document.getElementById("myCanvas");
    canvasMe.width = canvasMe.width;
    document.getElementById("myCanvas").style.display = "none";
    document.getElementById("clearing").style.display = "none";
    document.getElementById("guidance").style.display = "none";
    document.getElementById("history").style.display = "none";
    document.getElementById("printMoves").innerHTML = "";
    document.getElementById("txtMove").innerHTML = "";
    return moves = 0;
}