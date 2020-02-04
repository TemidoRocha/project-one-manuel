class Enemy {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.direction = 0; //s: 0 w:200 e: 400 n: 800
    this.pirates = [];
    this.numberOfPirates = 3;

    this.createPirates();
  }

  createPirates() {
    for (let i = 0; i < this.numberOfPirates; i++) {
      //the number of pirates shoul increase with the level

      this.setRandomPosition();
      if (this.col >= 150 || this.row >= 150) {
        //square(0, 0, 150, 150) will be saved for the character
        this.pirates.push({ col: this.col, row: this.row, direction: this.direction });
      }
    }
  }

  paintPirates() {
    var ctx = this.game.ctx;
    var pirates = this.pirates;

    for (let pirateInd of pirates) {
      switch (pirateInd.direction) {
        case 0: //s
        case 200: //w
        case 400: //e
        case 600: //n
          ctx.drawImage(
            pirateImg,
            0,
            pirateInd.direction,
            200,
            195,
            pirateInd.col,
            pirateInd.row,
            SQUARE_SIZE,
            SQUARE_SIZE
          );
      }
    }
  }

  setRandomPosition() {
    this.col = SQUARE_SIZE * Math.floor(Math.random() * 16); //16 columns (800/50)
    this.row = SQUARE_SIZE * Math.floor(Math.random() * 10); //10 rows (500/50)
  }
  checkPirateCleanPlayer = (enemy0Col, enemy0Row) => {
    //check collision between pirate and player
    if (enemy0Col === this.game.player.col && enemy0Row === this.game.player.row) {
      return (this.game.gameRun = false);
    }
  };

  moveEnemy() {
    var pirates = this.pirates;

    for (let pirateEl of pirates) {
      let enemy0Col = pirateEl.col; //created this variable in order to compare to all the plastic
      let enemy0Row = pirateEl.row; //created this variable in order to compare to all the plastic
      let value = Math.floor(Math.random() * 5);

      switch (
        value //direction value s: 0 w:200 e: 400 n: 800
      ) {
        case 1: //left
          if (pirateEl.col > 0) {
            enemy0Col -= 50;
            if (!this.game.player.isTherePlastic(enemy0Col, enemy0Row)) {
              pirateEl.col -= 50;
              pirateEl.direction = 200;
            }
            this.checkPirateCleanPlayer(enemy0Col, enemy0Row);
          }
          break;
        case 2: //up
          if (pirateEl.row > 0) {
            enemy0Row -= 50;
            if (!this.game.player.isTherePlastic(enemy0Col, enemy0Row)) {
              pirateEl.row -= 50;
              pirateEl.direction = 600;
            }
            this.checkPirateCleanPlayer(enemy0Col, enemy0Row);
          }
          break;
        case 3: //right
          if (pirateEl.col < $canvas.width - SQUARE_SIZE) {
            enemy0Col += 50;
            if (!this.game.player.isTherePlastic(enemy0Col, enemy0Row)) {
              pirateEl.col += 50;
              pirateEl.direction = 400;
            }
            this.checkPirateCleanPlayer(enemy0Col, enemy0Row);
          }
          break;
        case 4: //down
          if (pirateEl.row < $canvas.height - SQUARE_SIZE) {
            enemy0Row += 50;
            if (!this.game.player.isTherePlastic(enemy0Col, enemy0Row)) {
              pirateEl.row += 50;
              pirateEl.direction = 600;
            }
            this.checkPirateCleanPlayer(enemy0Col, enemy0Row);
          }
          break;
      }
    }
  }
}
