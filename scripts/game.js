class Game {
  constructor($canvas) {
    this.ctx = $canvas.getContext('2d');
    this.gameRun = false;
    this.speed = 300; // milisengundos, aftects the enemy speed with the loop
    this.score = 0;

    this.intro();
    this.activateStartKey();
    this.keyListner();
  }

  intro() {
    this.ctx.drawImage(intro, 400, 400, 350, 75);
  }

  level() {
    let level = document.getElementById('level').value; //catch the value from input range

    this.grid.pollution += level * 10; //level 1 => 60plastic --- level 5 => 100
    this.grid.makePlastic();

    this.enemy.numberOfPirates += Math.floor(level / 2); //level 1 => 3 pirates --- level 5 => 5 pirates
    this.enemy.createPirates();
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
    this.openFullscreen();
    this.grid = new Grid(this);
    this.power = new Power(this);
    this.enemy = new Enemy(this);
    this.player = new Player(this);
    this.bomb = new Bomb(this);
    this.bullet = new Bullet(this);
    this.gameRun = true;
    this.time = new Timer(this);
    this.score = 0;
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
    this.bullet.paintBullet();
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
  openFullscreen() {
    var elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  closeFullscreen() {
    //not using for now
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}
