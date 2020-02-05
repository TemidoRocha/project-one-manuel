class Bullet {
  constructor(game) {
    this.game = game;
    this.col = 100;
    this.row = 100;
    this.speed = 2000;
  }
  fireBullet() {
    if (event.key === 71) {
      this.col = this.game.player.col;
      this.row = this.game.player.row;
    }
  }
  paintBullet() {
    this.game.ctx.fillRect(this.col+20, this.row, 50, 50);
  }
}
