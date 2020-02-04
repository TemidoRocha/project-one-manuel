class Bomb {
  constructor(game) {
    this.game = game;
    this.col;
    this.row;
    this.bombCol;
    this.bombRow;
    this.dropped = false;
    this.speed = 2000;
  }
  drop = event => {
    if (event.key === ' ' && this.dropped === false) {
      this.col = this.game.player.col;
      this.row = this.game.player.row;
      this.cleanTimeout(); //inserts timeout for checking plastic, pirates and player
      this.dropped = true;
    }
  };
  paintBomb = () => {
    var ctx = this.game.ctx;
    ctx.drawImage(bombImg, this.col + 10, this.row + 10, SQUARE_SIZE - 20, SQUARE_SIZE - 20);
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
        this.game.score += 5;
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
          this.game.score += 5;
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
    this.bombCol = this.col;
    this.bombRow = this.row;
    delete this.col;
    delete this.row;
    //after it deletes the bomb goes the explosion
    this.explosion();
  };
  cleanTimeout() {
    //this function will remove the
    //we need to define the index otherwise it will not appear in the scope of this function
    let _bombPlastic = this.bombPlastic;
    let clean = setTimeout(() => {
      _bombPlastic();
    }, this.speed);
  }
  explosion() {
    let col = this.bombCol;
    let row = this.bombRow;
    let _this = this;

    var ctx = this.game.ctx;
    ctx.clearRect(col - 50, row - 50, SQUARE_SIZE + 100, SQUARE_SIZE + 100);
    //draw each frame + place them in the middle

    ctx.drawImage(
      explImg,
      shift,
      100,
      frameWidth,
      frameHeight,
      col - 50,
      row - 50,
      SQUARE_SIZE + 100,
      SQUARE_SIZE + 100
    );
    shift += frameWidth + 11;
    currentFrame++;
    setTimeout(() => {
      if (currentFrame < totalFrames) {
        this.explosion();
      } else {
        delete this.bombCol;
        delete this.bombRow;
        this.dropped = false;
        shift = 0;
        currentFrame = 0;
      }
    }, 100);
  }
}
