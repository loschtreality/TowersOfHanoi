const readline = require('readline');

const reader = readline.createInterface({

  input: process.stdin,
  output: process.stdout
});


class Game {
  constructor() {
    this.board = new Array(3)
     for (var i = 0; i < this.board.length; i++) {
       if (i === 0) {
         this.board[i] = [3,2,1]
       }
       else {
         this.board[i] = []

       }
     }
  }

  promptMove(callback) {
    this.print()
    let that = this
    reader.question("Where do you want to move the disks from: ", function(fromTower) {
      reader.question("Where do you want to move the disk to: ", function(toTower) {
        let startTowerIdx = parseInt(fromTower);
        let endTowerIdx = parseInt(toTower);

        return callback(startTowerIdx, endTowerIdx)
      })
    })
    return ""
  }

  isValidMove(startTowerIdx, endTowerIdx) {
    if (this.isInBounds(startTowerIdx) && this.isInBounds(endTowerIdx))
    {
      let start = this.board[startTowerIdx]
      let end = this.board[endTowerIdx]

      if (start.length > 0) {
        if(end.length === 0 || end[end.length - 1] > start[start.length - 1]) {
          return true
        }
      }
    }
    return false;
  }

  isInBounds(idx) {
    return (idx >= 0 && idx < this.board.length)
  }

  move (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let disk = this.board[startTowerIdx].pop();
      this.board[endTowerIdx].push(disk)
      return true;
    }

    return false;
  }

  print() {
    console.log(JSON.stringify(this.board))
  }

  isWon() {
    return (this.board[1].length === 3 || this.board[2].length === 3) ? true : false
  }

  run (completionCallback) {
   this.promptMove((start, end) => {
      if (this.move(start, end)) 
      {
        if (this.isWon())
        {
          console.log("You Win");
          completionCallback()
        }
        else
        {
          this.run(completionCallback)
        }
      }
      else
      {
        throw new Error("This is our Error")
      }
    })
  }
}

let g = new Game
g.run(function () {
  reader.close()
})

// console.log(g.promptMove(g.move))
// // reader.close()
