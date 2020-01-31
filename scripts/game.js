class Game {
  constructor($canvas) {
    this.ctx = $canvas.getContext('2d');

    this.player = new Player(this);
    this.bomb = new Bomb(this);
    this.enemy = new Enemy(this);
    //this.projectile = new Projectile(this);
    //this.powerAdd = new PowerAdd(this);

    this.paint();
  }
  paint() {
    this.ctx.s
  }
  clearCanvas() {
    this.ctx.clearCanvas(0, 0, this.ctx.width, this.ctx.height);
  }
}
