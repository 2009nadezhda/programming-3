var socket = io();


let side = 25;





function setup() {
    frameRate(5);
    createCanvas(30 * side, 30 * side);
    background('#E0FFFF');

 

}





function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            } else if (matrix[y][x] == 4) {
                fill("white");
                rect(x * side, y * side, side, side);
            }else if (matrix[y][x] == 5) {
                fill("brown");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill("#4ADEDE");
                rect(x * side, y * side, side, side);
            }
        }
    }


}

socket.on("send matrix", nkarel)


function addGrass(){
    socket.emit("addGrass")
}


function addGrassEater(){
    socket.emit("addGrassEater")
}

function addBuk(){
    socket.emit("addBuk")
}

function addDraf(){
    socket.emit("addDraf")
}


function addHut(){
    socket.emit("addHut")
}

function addPredator(){
    socket.emit("addPredator")
} 

function kill(){
    socket.emit("kill")
}



