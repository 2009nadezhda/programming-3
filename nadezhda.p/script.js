var socket = io();
let side = 25;


socket.on('Winter',function (data){
    weath = data;
})

socket.on('Summer',function (data){
    weath = data;
})

socket.on('Spring',function (data){
    weath = data;
})

socket.on('Autumn',function (data){
    weath = data;
})

// var weath = "spring";

function setup() {
    frameRate(5);
    createCanvas(30 * side, 30 * side);
    background('#E0FFFF');


}


var weath = "spring"

function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                if(weath == "spring"){
                    fill("green")
                }else    if(weath == "summer"){ 
                    fill("yellow")
                }else    if(weath == "winter"){ 
                    fill("white")
                }else if(weath == "autumn"){ 
                    fill("red")
            }}
            if(matrix[y][x] == 6){
                if(weath  == "spring"){
                    fill("#EA10C4")
                }else if( weath == "summer"){
                    fill("red")
                }else if(weath == "autumn"){
                    fill("#F57D1D")
                }else if(weath == "winter"){
                    fill("black")
                    this.energy = -1
                }
                
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            } else if (matrix[y][x] == 4) {
                fill("white");
            }else if (matrix[y][x] == 5) {
                fill("brown");
            }
           
            rect(x * side, y * side, side, side);
    

        }
    }


}

socket.on("send matrix", nkarel)

function Winter() {
    socket.emit("winter");
}
function Summer() {
    socket.emit("summer");
}
function Spring() {
    socket.emit("spring");
}
function Autumn() {
    socket.emit("autumn");
}


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



