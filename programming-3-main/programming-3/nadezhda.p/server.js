
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

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

 

 io.sockets.emit('send matrix', matrix)

grassArr = [];
grassEaterArr = [];
bukArr = []
hutArr = []
drafArr = []
predatorArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Buk = require("./Buk")
Draf = require("./Draf")
Predator = require("./Predator")
Hut = require("./Hut");






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

    
setInterval(game,300)
   
io.on('connection', function () {
    createObject()
})















