class Power {
  constructor(game) {
    this.game = game;
    this.col; //whale
    this.row; //whale
    this.whaleTimeAdded = 15;
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
    if (this.game.time.timerCount < 20) {
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
  }
  checkWhaleColision() {
    // console.dir(this.player.col);
    if (this.col === this.game.player.col && this.row === this.game.player.row) {
      this.game.time.timerCount += this.whaleTimeAdded;
      delete this.col;
      delete this.row;
    }
  }
  superBombDrop() {}
}
