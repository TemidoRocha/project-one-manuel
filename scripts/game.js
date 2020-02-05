class Game {
  constructor($canvas) {
    this.ctx = $canvas.getContext('2d');
    this.gameRun = false;
    this.speed = 300; // milisengundos, aftects the enemy speed with the loop
    this.score = 0;
    //this.projectile = new Projectile(this);
    //this.powerAdd = new PowerAdd(this);
    this.intro();
    this.activateStartKey();
    this.keyListner();
  }

  intro() {
    this.ctx.drawImage(intro, 400, 400, 350, 75);
  }

  level() {
    let level = document.getElementById('level').value;
    this.grid.pollution *= level;
    this.grid.makePlastic();
    console.log(this.grid.pollution);
    for (let i = 0; i < level - 1; i++) {
      this.grid.makePlastic();
      this.enemy.createPirates();
    }
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
    this.grid = new Grid(this);
    this.power = new Power(this);
    this.enemy = new Enemy(this);
    this.player = new Player(this);
    this.bomb = new Bomb(this);
    this.gameRun = true;
    this.time = new Timer(this);
    this.level();
    this.loop();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  }

  paint() {
    //this.grid.paintGrid();
    this.clearCanvas();
    this.power.paintPowerUp();
    this.grid.paintPlastic();
    this.player.paintCharacter();
    this.enemy.paintPirates();
    this.bomb.paintBomb();
  }

  paintGameOver() {
    this.clearCanvas();
    this.ctx.drawImage(gameOver, 0, 0, 800, 500);
  }

  paintGameWon() {
    this.clearCanvas();
    this.ctx.drawImage(youWin, 0, 0, 800, 500);
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

        //this.paint(); //taking out this the movement of the ship is slower as per loop
      }
    });
  }

  loop() {
    //https://coderwall.com/p/65073w/using-this-in-scope-based-settimeout-setinterval
    const _this = this; //connect a variable to our current scope by defining a new variable and assigning this to it.
    score.innerText = this.score;

    if (this.gameRun && this.grid.plastic.length > 0) {
      this.enemy.moveEnemy();
      this.paint();
    }

    if (!this.gameRun) {
      this.paintGameOver();
    } else if (this.grid.plastic.length < 1 && this.gameRun) {
      this.gameRun = false;
      this.paintGameWon();
    }

    if (this.gameRun) {
      setTimeout(() => {
        _this.loop();
      }, this.speed);
    }
  }
}
