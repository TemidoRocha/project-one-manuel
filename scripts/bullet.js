class Bullet {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.arrowPower = 15; //afects the enemy.health
    //the following variables defined in fireBullet() and define how long the arro will go
    this.bulletRange = 4;
    this.colMax;
    this.rowMax;
    this.colMin;
    this.rowMin;

    this.direction; //L R U D //important to define the direction of the arrow and the image to appear, same as the ship at the time we press fire
    this.speed = 100;
  }
  fireBullet(event) {
    if (event.key === 'g') {
      this.col = this.game.player.col;
      this.row = this.game.player.row;
      this.colMax = this.game.player.col + SQUARE_SIZE * this.bulletRange;
      this.rowMax = this.game.player.row + SQUARE_SIZE * this.bulletRange;
      this.colMin = this.game.player.col - SQUARE_SIZE * this.bulletRange;
      this.rowMin = this.game.player.row - SQUARE_SIZE * this.bulletRange;
      this.direction = this.game.player.direction;
    }
    this.moveBullet();
  }
  paintBullet() {
    switch (this.direction) {
      case 'R':
        this.game.ctx.drawImage(arrowR, this.col + 20, this.row + 20, 20, 10);
        break;
      case 'L':
        this.game.ctx.drawImage(arrowL, this.col + 20, this.row + 20, 20, 10);
        break;
      case 'U':
        this.game.ctx.drawImage(arrowU, this.col + 20, this.row + 20, 20, 10);
        break;
      case 'D':
        this.game.ctx.drawImage(arrowD, this.col + 20, this.row + 20, 20, 10);
        break;
    }
  }
  moveBullet() {
    if (this.game.gameRun) this.game.paint();
    arrowAudio.play();
    this.destroyPirateShip();
    switch (this.direction) {
      case 'L':
        this.col -= 5;
        if (this.col > this.colMin) {
          this.bulletTime();
        }
        break;
      case 'R':
        this.col += 5;
        if (this.col < this.colMax) {
          this.bulletTime();
        } else this.removeBullet();
        break;
      case 'U':
        this.row -= 5;
        if (this.row > this.rowMin) {
          this.bulletTime();
        } else this.removeBullet();
        break;
      case 'D':
        this.row += 5;
        if (this.row < this.rowMax) {
          this.bulletTime();
        } else this.removeBullet();
        break;
    }
  }
  bulletTime() {
    let _this = this;
    if (this.game.gameRun) {
      setTimeout(() => {
        _this.moveBullet();
      }, this.speed);
    }
  }
  removeBullet() {
    arrowAudio.pause();
    delete this.col;
    delete this.row;
  }
  destroyPirateShip() {
    var pirates = this.game.enemy.pirates; //array with all the pirates
    for (let i = pirates.length - 1; i >= 0; i--) {
      if (
        //check if you hit the pirate
        this.col >= pirates[i].col &&
        this.col <= pirates[i].col + SQUARE_SIZE &&
        this.row >= pirates[i].row &&
        this.row <= pirates[i].row + SQUARE_SIZE
      ) {
        this.removeBullet();
        this.game.enemy.health -= this.arrowPower;
        if (this.game.enemy.health <= 0) {
          pirates.splice(i, 1);
          this.game.score += 10;
        }
      }
    }
  }
}
