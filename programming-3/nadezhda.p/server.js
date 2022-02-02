
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

grassArr = [];
grassEaterArr = [];
bukArr = []
hutArr = []
drafArr = []
predatorArr = []
matrix = [];

Grass = require("./Grass")
GrassEater = require("./GrassEater")
Buk = require("./Buk")
Draf = require("./Draf")
Predator = require("./Predator")
Hut = require("./Hut");






function createObject(matrix) {
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

}

io.sockets.emit('send matrix', matrix)


    


















