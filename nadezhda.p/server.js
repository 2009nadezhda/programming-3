
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
const Predator = require('./predator');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

//  matrix = [];

matrix =[];
function generator(matLen, gr, grEat,pred, ht, df, bk) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < ht; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
        for (let i = 0; i < df; i++) {
            let x = Math.floor(Math.random() * matLen);
            let y = Math.floor(Math.random() * matLen);
            if (matrix[x][y] == 0) {
                matrix[x][y] = 5;
            }
        }
        for (let i = 0; i < bk; i++) {
            let x = Math.floor(Math.random() * matLen);
            let y = Math.floor(Math.random() * matLen);
            if (matrix[x][y] == 0) {
                matrix[x][y] = 6;
            }
        }
    }
    return matrix;
}

matrix = generator(30 ,18, 15, 8, 5, 5, 8);

 

 io.sockets.emit("send matrix", matrix)

grassArr = [];
grassEaterArr = [];
bukArr = []
hutArr = []
drafArr = []
predatorArr = []

Grass = require("./grass")
GrassEater = require("./grassEater")
Buk = require("./buk")
Draf = require("./draf")
predator = require("./predator")
Hut = require("./hut");






function createObject() {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var eat = new GrassEater(x, y)
                grassEaterArr.push(eat)
            }
            else if (matrix[y][x] == 3) {
                var pred = new Predator(x, y)
                predatorArr.push(pred)
            }
            else if (matrix[y][x] == 4) {
                var ht = new Hut(x, y)
                hutArr.push(ht)
            }
            else if (matrix[y][x] == 5) {
                var df = new Draf(x, y) 
                drafArr.push(df)
            }
            else if (matrix[y][x] == 6) {
                var bk = new Buk(x, y)
                bukArr.push(bk)
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}



    
function game() {
    for (let i in grassArr) {
        grassArr[i].mul();
    }

    for (let i in grassEaterArr) {
        grassEaterArr[i].mul();
        grassEaterArr[i].eat()
    }

    for (let i in predatorArr) {
        predatorArr[i].mul();
        predatorArr[i].eat()
    }
    for (let i in hutArr) {
        hutArr[i].mul();
        hutArr[i].eat()
    }
    for (let i in drafArr) {
        drafArr[i].mul();
        drafArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
    
    
}

    
setInterval(game,500)

///

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    bukArr = [];
    hutArr = [];
    drafArr = []; 
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}
   


function addGrass(){
    for(let i = 0 ; i < 4 ; i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
                matrix[y][x] = 1
             var gr = new Grass(x,y)
             grassArr.push(gr)

    }
}

function addGrassEater(){
    for(let i = 0 ; i < 2 ; i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
                matrix[y][x] = 2
             var grEat = new GrassEater(x,y)
             grassEaterArr.push(grEat)

    }

}

function addBuk(){
    for(let i = 0 ; i < 5 ; i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
                matrix[y][x] = 3
             var buk = new Buk(x,y)
             bukArr.push(buk)

    }
} 

function addDraf(){
    for(let i = 0 ; i < 4 ; i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
                matrix[y][x] = 4
             var draf = new Draf(x,y)
             drafArr.push(draf)

   }
}

function addHut(){
    for(let i = 0 ; i < 4 ; i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
                matrix[y][x] = 5
             var hut = new Hut(x,y)
             hutArr.push(hut)

   }

}


function addPredator(){
    for(let i = 0 ; i < 6 ; i++){
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
                matrix[y][x] = 6
             var prd = new predator(x,y)
             predatorArr.push(prd)

   }

}








io.on('connection', function (socket) {
    createObject()
    socket.on("addGrass",addGrass)
    socket.on("addGrassEater",addGrassEater)
    socket.on("addBuk",addBuk)
    socket.on("addDraf",addDraf)
    socket.on("addHut",addHut)
    socket.on("addPredator",addPredator)
    socket.on("kill", kill)
})


var statistics = {}

setInterval(function(){
    statistics.grass = grassArr.length
    statistics.GrassEater = grassEaterArr.length
    statistics.buk = bukArr.length
    statistics.draf = drafArr.length
    statistics.hut = hutArr.length
    statistics.predator = predatorArr.length

fs.writeFile("statistics.json", JSON.stringify(statistics),function(){
       // console.log("statistics");
})
},1000)







