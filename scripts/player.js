class Player {
  constructor(game) {
    this.game = game;
    this.col = 0;
    this.row = 0;
    //this.health = 100 => if we manage to introduce guns for the pirates
  }

  paintCharacter() {
    var ctx = this.game.ctx;
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.col, this.row, SQUARE_SIZE, SQUARE_SIZE);
  }
  move(event) {
    var value = event.keyCode;

    let player0Col = this.col; //created this variable in order to compare to all the plastic
    let player0Row = this.row; //created this variable in order to compare to all the plastic
    //console.log(player0Col, player0Row);

    switch (value) {
      case 37: //left
        if (this.col > 0) {
          player0Col -= 50;
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.col -= 50;
          }
        }
        break;
      case 38: //up
        if (this.row > 0) {
          player0Row -= 50;
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.row -= 50;
          }
        }
        break;
      case 39: //right
        if (this.col < $canvas.width - SQUARE_SIZE) {
          player0Col += 50;
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.col += 50;
          }
        }
        break;
      case 40: //down
        if (this.row < $canvas.height - SQUARE_SIZE) {
          player0Row += 50;
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.row += 50;
          }
        }
        break;
    }
  }
  isTherePlastic(playerCol, playerRow) {
    let plasticLoad = this.game.grid.plastic;
    let result;
    for (let plasticSq of plasticLoad) {
      if (playerCol === plasticSq.col && playerRow === plasticSq.row) {
        return true;
      }
    }
  }
}
