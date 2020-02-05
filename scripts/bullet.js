class Bullet {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.colMax;
    this.rowMax;
    this.colMin;
    this.rowMin;

    this.direction; //L R U D
    this.bulletLoad = [];
    this.speed = 100;
  }
  fireBullet(event) {
    if (event.key === 'g') {
      this.col = this.game.player.col;
      this.row = this.game.player.row;
      this.colMax = this.game.player.col + SQUARE_SIZE * 4;
      this.rowMax = this.game.player.row + SQUARE_SIZE * 4;
      this.colMin = this.game.player.col - SQUARE_SIZE * 4;
      this.rowMin = this.game.player.row - SQUARE_SIZE * 4;
      this.direction = this.game.player.direction;
    }
    this.moveBullet();
  }
  paintBullet() {
    this.game.ctx.fillRect(this.col + 20, this.row + 20, 10, 10);
  }
  moveBullet() {
    this.game.paint();

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
    delete this.col;
    delete this.row;
  }
}
