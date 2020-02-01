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

    switch (value) {
      case 37: //left
        if (this.col > 0) {
          this.col -= 50;
        }
        break;
      case 38: //up
        if (this.row > 0) {
          this.row -= 50;
        }
        break;
      case 39: //right
        if (this.col < $canvas.width - SQUARE_SIZE) {
          this.col += 50;
        }
        break;
      case 40: //down
        if (this.row < $canvas.height - SQUARE_SIZE) {
          this.row += 50;
        }
        break;
    }
  }
}
