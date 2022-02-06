let LivingCreature = require('./LivingCreature')

module.exports =  class Draf extends LivingCreature{
    constructor(x, y,index) {
      super(x,y,index)
      

    }

    

    mul() {
        this.multiply++;
        var emptyCells = super.chooseCell(0);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell && this.multiply >= 8) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var newDraf = new Draf(newX, newY);
            drafArr.push(newDraf);
            this.multiply = 0;
        }
    }

    move() {
        this.energy--
        var emptyCells = super.chooseCell(0)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        if (newCell && this.energy >= 0) {
            var newX = newCell[0]
            var newY = newCell[1]
            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            if (this.energy < 0) {
                this.die()
            }
        }
    }

    eat() {
        var emptyCells = super.chooseCell(4)
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in hutArr) {
                if (newX == hutArr[i].x && newY == hutArr[i].y) {
                    hutArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in drafArr) {
            if (this.x == drafArr[i].x && this.y == drafArr[i].y) {
                drafArr.splice(i, 1);
                break;
            }
        }
    }
}