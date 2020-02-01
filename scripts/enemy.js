class Enemy {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.pirates = [];

    //this.createPirates();
  }

  createPirates() {
    for (let i = 0; i < 1; i++) {
      //the number of pirates shoul increase with the level

      this.game.plastic.setRandomPosition();
      if (this.col >= 150 || this.row >= 150) {
        //square(0, 0, 150, 150) will be saved for the character
        this.plastic.push({ col: this.col, row: this.row });
      }
    }
  }
}
