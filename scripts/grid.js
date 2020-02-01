class Grid {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.plastic = []; //separate makePlastic from paint otherwise it was generating randomly every key press

    this.makePlastic();
  }
  paintGrid() {
    //paint the grid
    var ctx = this.game.ctx; //we need so we can access canvas from class Game
    for (let i = 0; i <= 10; i++) {
      //after we can leave the outer lines and clean the interior grid
      ctx.beginPath();
      ctx.strokeStyle = 'orange';
      ctx.moveTo(0, 0 + i * SQUARE_SIZE);
      ctx.lineTo($canvas.width, SQUARE_SIZE * i);
      ctx.stroke();
      ctx.closePath();
    }
    for (let i = 0; i <= 16; i++) {
      ctx.beginPath();
      //context.strokeStyle('orange');
      ctx.moveTo(0 + SQUARE_SIZE * i, 0);
      ctx.lineTo(SQUARE_SIZE * i, $canvas.height);
      ctx.stroke();
      ctx.closePath();
    }
  }
  makePlastic() {
    
    for (let i = 0; i <= 50; i++) {
      //to increase the number of plastic just increase the i to increase the array
      this.setRandomPosition();
      if (this.col >= 150 || this.row >= 150) {
        //square(0, 0, 150, 150) will be saved for the character
        this.plastic.push({ col: this.col, row: this.row });
      }
    }
  }
  paintPlastic() {
    var ctx = this.game.ctx;
    for (let i = 0; i < this.plastic.length; i++) {
      //we need the length to be sure all the plastic inside the array is read and not more otherwise will display undefined
      ctx.fillStyle = 'red';
      ctx.fillRect(this.plastic[i].col, this.plastic[i].row, SQUARE_SIZE, SQUARE_SIZE);
    }
  }

  setRandomPosition() {
    this.col = SQUARE_SIZE * Math.floor(Math.random() * 16); //16 columns (800/50)
    this.row = SQUARE_SIZE * Math.floor(Math.random() * 10); //10 rows (500/50)
  }
}
