class Game {
  constructor($canvas) {
    this.ctx = $canvas.getContext('2d');
    this.gameRun = false;
    this.speed = 300; // milisengundos, aftects the enemy speed with the loop
    this.score = 0;

    //this.projectile = new Projectile(this);
    //this.powerAdd = new PowerAdd(this);
    this.activateStartKey();
  }
  activateStartKey = () => {
    let _this = this;
    document.getElementById('start').onclick = function() {
      if (!_this.gameRun) {
        _this.startGame();
      }
    };
  };
  startGame() {
    this.keyListner();
    this.restart();
  }
  restart() {
    this.grid = new Grid(this);
    this.player = new Player(this);
    this.bomb = new Bomb(this);
    this.enemy = new Enemy(this);
    this.loop();
    this.gameRun = true;
    this.time = new Timer(this);
  }

  paint() {
    //this.grid.paintGrid();
    this.clearCanvas();
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
      if (this.gameRun) {
        this.player.move(event); //takes the argument event to move the player
        this.bomb.drop(event);

        this.paint(); //taking out this the movement of the ship is slower as per loop
      }
    });
  }
  checkGameIsRunning = () => {
    score.innerText = this.score;

    if (!this.gameRun) {
      this.clearCanvas();
      this.ctx.drawImage(gameOver, 0, 0, 800, 500);
    } else if (this.grid.plastic.length < 1 && this.gameRun === true) {
      this.gameRun = false;
      this.clearCanvas();
      this.ctx.drawImage(youWin, 0, 0, 800, 500);
    } else {
      this.enemy.moveEnemy();
      this.paint();
      this.loop();
    }
  };
  loop() {
    //https://coderwall.com/p/65073w/using-this-in-scope-based-settimeout-setinterval
    const _this = this; //connect a variable to our current scope by defining a new variable and assigning this to it.
    setTimeout(() => {
      _this.checkGameIsRunning();
    }, this.speed);
  }
}
