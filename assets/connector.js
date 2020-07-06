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
                document.getElementById("txtMove").innerHTML += moves + "- " + this.responseText;
                document.getElementById("txtMove").innerHTML += "<br>";
            }
        };
        moves++;
    } else {
        document.getElementById("txtMove").innerHTML += "please enter a distance to move" + "<br>" + "up to 10 meter!" + "<br>";
    }
    return moves;
}

function getMoves() {
    document.getElementById("printMoves").innerHTML += "you do " + moves + " moves which are " + "<br>";
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
                var len = response.length;
                for (var i = 0; i < len; i++) {
                    var id = i;
                    var distance = response[i].distance;
                    var direction = response[i].direction;
                    drawMap(distance, direction, i, moves);
                }
            },
            error: function () {
                document.getElementById("myCanvas").innerHTML = "server doesnt works";
            }


        })
    }

}

//no use for this function because I just change the css display of canvas
function setCanvas(distance, direction) {
    var canvasDraw = document.createElement("canvas");
    canvasDraw.id = "myCanvas";
    canvasDraw.width = 301;
    canvasDraw.height = 301;
    canvasDraw.style.border = "1px solid white";
    document.body.appendChild(canvasDraw);
    document.getElementById('myCanvas').appendChild(canvasDraw);
}

function drawMap(distance, direction, i, moves) {
    document.getElementById("printMoves").innerHTML += i + 1 + " " + distance.toString() + " " + direction + "<br>";
    document.getElementById("myCanvas").style.display = "inline";
    var startX = 150;
    var startY = 301;
    var distanceScale = distance * 10;
    var directionDraw = direction;

    var canvasMe = document.getElementById("myCanvas");
    var ctx = canvasMe.getContext("2d");

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'white';
    
    if (i == 0) {
        ctx.moveTo(startX, startY);
    }

    if (directionDraw == "right") {
        ctx.lineTo(startX, 300 - distanceScale);
        ctx.lineTo(startX + distanceScale, 300 - distanceScale);
        ctx.stroke()
    }
    if (directionDraw == "left") {
        ctx.lineTo(startX, 300 - distanceScale);
        ctx.lineTo(startX - distanceScale, 300 - distanceScale);
        ctx.stroke()
    }


}

function clearCanvas() {
    var canvasMe = document.getElementById("myCanvas");
    var ctx = canvasMe.getContext("2d");
    canvasMe.width = canvasMe.width;

}