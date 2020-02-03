class Bomb {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.speed = 500;
  }
  drop = event => {
    if (event.key === ' ') {
      this.col = this.game.player.col;
      this.row = this.game.player.row;
      this.bombPlastic();
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
        let cleanPlastic = setTimeout(() => {
          plasticLoad.splice(i, 1); //remove all the plastic 1 square near the bomb
        }, this.speed);
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
        pirates.splice(i, 1); //kill the pirates
      }
    }
  };
}
