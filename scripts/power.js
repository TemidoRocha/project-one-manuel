class Power {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.addPowerUp();
  }
  addPowerUp() {
    let plasticParticles = this.game.grid.plastic;
    let whale = plasticParticles[Math.floor(Math.random() * plasticParticles.length)];
    this.col = whale.col;
    this.row = whale.row;
  }
  paintPowerUp() {
    let col = this.col;
    let row = this.row;
    let _this = this;

    var ctx = this.game.ctx;
    ctx.clearRect(col, row, SQUARE_SIZE, SQUARE_SIZE);
    //draw each frame + place them in the middle

    ctx.drawImage(
      whaleImg,
      0,
      shiftW,
      frameWidthW,
      frameHeightW,
      this.col,
      this.row + 25,
      SQUARE_SIZE,
      SQUARE_SIZE / 2
    );
  }
  setRandomPosition() {
    this.col = SQUARE_SIZE * Math.floor(Math.random() * 16); //16 columns (800/50)
    this.row = SQUARE_SIZE * Math.floor(Math.random() * 10); //10 rows (500/50)
  }
  checkWhaleColision() {
    // console.dir(this.player.col);
    if (this.col === this.game.player.col && this.row === this.game.player.row) {
      this.game.time.timerCount += 15;
      delete this.col;
      delete this.row;
    }
  }
}
