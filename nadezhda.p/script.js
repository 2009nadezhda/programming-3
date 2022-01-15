function generator(matLen, gr, grEat,pred, ht, df, bk) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() *                     matLen);
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

let side = 25;

let matrix = generator(30 ,55, 15, 3, 5, 5, 3);


var grassArr = [];
var grassEaterArr = []
var predatorArr = []
var hutArr = []
var drafArr = []
var bukArr = []

function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#E0FFFF');

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





function draw() {

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
}
