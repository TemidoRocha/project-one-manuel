class Enemy {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.pirates = [];

    this.createPirates();
  }

  createPirates() {
    for (let i = 0; i < 1; i++) {
      //the number of pirates shoul increase with the level

      this.setRandomPosition();
      if (this.col >= 150 || this.row >= 150) {
        //square(0, 0, 150, 150) will be saved for the character
        this.pirates.push({ col: this.col, row: this.row });
      }
    }
  }

  paintPirates() {
    let ctx = this.game.ctx;
    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.fillRect(this.col, this.row, SQUARE_SIZE, SQUARE_SIZE);
    ctx.closePath();
  }

  setRandomPosition() {
    this.col = SQUARE_SIZE * Math.floor(Math.random() * 16); //16 columns (800/50)
    this.row = SQUARE_SIZE * Math.floor(Math.random() * 10); //10 rows (500/50)
  }
}
