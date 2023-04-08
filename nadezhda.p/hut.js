let LivingCreature = require('./LivingCreature')

module.exports =  class Hut extends LivingCreature{
    constructor(x, y,index) {
        super(x,y,index)
        this.energy = 12;
        this.multiply = 0
        
    }

   

    mul() {
        super.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && super.multiply >= 10) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var newHut = new Hut(newX, newY);
            hutArr.push(newHut);
            super.multiply = 0;
        }
    }

    move() {
        super.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && super.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (super.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = super.chooseCell(1)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        var emptyCells2 = super.chooseCell(6)
        var newCell2 = emptyCells2[Math.floor(Math.random() * emptyCells2.length)]

        if (newCell) {
            super.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else if (newCell2) {
            super.energy += 3
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in hutArr) {
            if (this.x == hutArr[i].x && this.y == hutArr[i].y) {
                hutArr.splice(i, 1);
                break;
            }
        }
    }
}