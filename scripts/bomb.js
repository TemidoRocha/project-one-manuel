class Bomb {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.speed = 2000;
  }
  drop = event => {
    if (event.key === ' ') {
      this.col = this.game.player.col;
      this.row = this.game.player.row;
      this.cleanTimeout(); //inserts timeout for checking plastic, pirates and player
    }
  };
  paintBomb = () => {
    var ctx = this.game.ctx;
    ctx.fillStyle = 'purple';
    ctx.fillRect(this.col, this.row, SQUARE_SIZE, SQUARE_SIZE);
  };
  bombPlastic = () => {
    let plasticLoad = this.game.grid.plastic; //array with all the plastic
    var pirates = this.game.enemy.pirates; //array with all the pirates
    var player = this.game.player;
    for (let i = plasticLoad.length - 1; i >= 0; i--) {
      if (
        //check if any plastic is near by one square in 8 directions
        (plasticLoad[i].col === this.col - SQUARE_SIZE &&
          plasticLoad[i].row === this.row - SQUARE_SIZE) ||
        (plasticLoad[i].col === this.col && plasticLoad[i].row === this.row - SQUARE_SIZE) ||
        (plasticLoad[i].col === this.col + SQUARE_SIZE &&
          plasticLoad[i].row === this.row - SQUARE_SIZE) ||
        (plasticLoad[i].col === this.col - SQUARE_SIZE && plasticLoad[i].row === this.row) ||
        (plasticLoad[i].col === this.col && plasticLoad[i].row === this.row) ||
        (plasticLoad[i].col === this.col + SQUARE_SIZE && plasticLoad[i].row === this.row) ||
        (plasticLoad[i].col === this.col - SQUARE_SIZE &&
          plasticLoad[i].row === this.row + SQUARE_SIZE) ||
        (plasticLoad[i].col === this.col && plasticLoad[i].row === this.row + SQUARE_SIZE) ||
        (plasticLoad[i].col === this.col + SQUARE_SIZE &&
          plasticLoad[i].row === this.row + SQUARE_SIZE)
      ) {
        plasticLoad.splice(i, 1);
      }
    }
    for (let i = pirates.length - 1; i >= 0; i--) {
      if (
        //check if any pirate is near by one square in 8 directions
        (pirates[i].col === this.col - SQUARE_SIZE && pirates[i].row === this.row - SQUARE_SIZE) ||
        (pirates[i].col === this.col && pirates[i].row === this.row - SQUARE_SIZE) ||
        (pirates[i].col === this.col + SQUARE_SIZE && pirates[i].row === this.row - SQUARE_SIZE) ||
        (pirates[i].col === this.col - SQUARE_SIZE && pirates[i].row === this.row) ||
        (pirates[i].col === this.col && pirates[i].row === this.row) ||
        (pirates[i].col === this.col + SQUARE_SIZE && pirates[i].row === this.row) ||
        (pirates[i].col === this.col - SQUARE_SIZE && pirates[i].row === this.row + SQUARE_SIZE) ||
        (pirates[i].col === this.col && pirates[i].row === this.row + SQUARE_SIZE) ||
        (pirates[i].col === this.col + SQUARE_SIZE && pirates[i].row === this.row + SQUARE_SIZE)
      ) {
        {
          pirates.splice(i, 1);
        }
      }
      if (
        (player.col === this.col - SQUARE_SIZE && player.row === this.row - SQUARE_SIZE) ||
        (player.col === this.col && player.row === this.row - SQUARE_SIZE) ||
        (player.col === this.col + SQUARE_SIZE && player.row === this.row - SQUARE_SIZE) ||
        (player.col === this.col - SQUARE_SIZE && player.row === this.row) ||
        (player.col === this.col && player.row === this.row) ||
        (player.col === this.col + SQUARE_SIZE && player.row === this.row) ||
        (player.col === this.col - SQUARE_SIZE && player.row === this.row + SQUARE_SIZE) ||
        (player.col === this.col && player.row === this.row + SQUARE_SIZE) ||
        (player.col === this.col + SQUARE_SIZE && player.row === this.row + SQUARE_SIZE)
      ) {
        this.game.gameRun = false;
      }
    }
    delete this.col;
    delete this.row;
  };
  cleanTimeout() {
    //this function will remove the
    //we need to define the index otherwise it will not appear in the scope of this function
    let _bombPlastic = this.bombPlastic;
    let clean = setTimeout(() => {
      _bombPlastic();
    }, this.speed);
  }
}
