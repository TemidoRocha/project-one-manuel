class Game {
  constructor($canvas) {
    this.ctx = $canvas.getContext('2d');

    this.player = new Player(this);
    this.bomb = new Bomb(this);
    this.enemy = new Enemy(this);
    this.grid = new Grid(this);
    //this.projectile = new Projectile(this);
    //this.powerAdd = new PowerAdd(this);

    //bellow we command the consctructer to use method paint when we [new Game($canvas)]
    this.paint();
    this.keyListner();
    this.loop();
  }

  paint() {
    this.grid.paintGrid();
    this.grid.paintPlastic();
    this.player.paintCharacter();
    this.enemy.paintPirates();
    this.bomb.paintBomb();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  }

  keyListner() {
    window.addEventListener('keydown', event => {
      if (
        event.code === 'Space' || //space
        event.keyCode === 37 || //left
        event.keyCode === 38 || //up
        event.keyCode === 39 || //right
        event.keyCode === 40 //down
      ) {
        event.preventDefault(); // Stop the default behavior (moving the screen to the left/up/right/down)
      }

      this.player.move(event); //takes the argument event to move the player
      this.bomb.drop(event);

      this.clearCanvas();
      this.paint();
    });
  }

  loop() {
    //https://coderwall.com/p/65073w/using-this-in-scope-based-settimeout-setinterval
    const _this = this; //connect a variable to our current scope by defining a new variable and assigning this to it.
    setInterval(() => {
      _this.enemy.moveEnemy();
      _this.clearCanvas();
      _this.paint();
    }, this.enemy.speed);
  }
}
