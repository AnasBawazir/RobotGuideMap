function doMove(direction) {
    //var distance = document.getElementById("distance").value;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "doMovement.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("direction="+direction/*+"&"+"distance="+distance*/);
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("txtMove").innerHTML = this.responseText;
        }
    };
}