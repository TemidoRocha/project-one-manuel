class Timer {
  constructor(game) {
    this.game = game;
    this.setTimer();
  }
  setTimer() {
    let _this = this;
    if (this.game.gameRun && timer.innerText > 0) {
      setTimeout(() => {
        timer.innerText -= 1;
        _this.setTimer();
      }, 1000);
    } else {
      return (this.game.gameRun = false);
    }
  }
}
