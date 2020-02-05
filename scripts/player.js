class Player {
  constructor(game) {
    this.game = game;
    this.col = 0;
    this.row = 0;
    this.leftOrRight = playerImgL;
    this.direction; //L R U D =>  it will influence the bullet
    //this.health = 100 => if we manage to introduce guns for the pirates
  }

  paintCharacter() {
    var ctx = this.game.ctx;
    switch (this.leftOrRight) {
      case playerImgL:
      case playerImgR:
        ctx.drawImage(this.leftOrRight, this.col, this.row, SQUARE_SIZE, SQUARE_SIZE);
    }
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
          this.direction = 'L';
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.col -= 50;
            this.leftOrRight = playerImgL;
            this.game.power.checkWhaleColision();
            this.checkPirateCleanPlayer();
          }
        }
        break;
      case 38: //up
        if (this.row > 0) {
          player0Row -= 50;
          this.direction = 'U';
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.row -= 50;
            this.game.power.checkWhaleColision();
            this.checkPirateCleanPlayer();
          }
        }
        break;
      case 39: //right
        if (this.col < $canvas.width - SQUARE_SIZE) {
          player0Col += 50;
          this.direction = 'R';
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.col += 50;
            this.leftOrRight = playerImgR;
            this.game.power.checkWhaleColision();
            this.checkPirateCleanPlayer();
          }
        }
        break;
      case 40: //down
        if (this.row < $canvas.height - SQUARE_SIZE) {
          player0Row += 50;
          this.direction = 'D';
          if (!this.isTherePlastic(player0Col, player0Row)) {
            this.row += 50;
            this.game.power.checkWhaleColision();
            this.checkPirateCleanPlayer();
          }
        }
        break;
    }

    this.game.paint();
  }

  isTherePlastic(identityCol, identityRow) {
    //check if the player is going to colide with plastic
    let plasticLoad = this.game.grid.plastic;
    let result;
    for (let plasticSq of plasticLoad) {
      if (identityCol === plasticSq.col && identityRow === plasticSq.row) {
        return true;
      }
    }
  }
  checkPirateCleanPlayer = () => {
    let pirates = this.game.enemy.pirates;

    for (let pirateEl of pirates) {
      let enemy0Col = pirateEl.col;
      let enemy0Row = pirateEl.row;
      //check collision between pirate and player
      if (enemy0Col === this.col && enemy0Row === this.row) {
        this.game.gameRun = false;
      }
    }
  };
}
