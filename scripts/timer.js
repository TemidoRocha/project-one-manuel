class Timer {
  constructor(game) {
    this.game = game;
    this.timerCount = 60;
    this.setTimer();
  }
  setTimer() {
    let _this = this;
    if (this.game.gameRun && timer.innerText > 0) {
      setTimeout(() => {
        _this.timerCount -= 1;
        timer.innerText = _this.timerCount;
        _this.setTimer();
      }, 1000);
    } else {
      this.game.gameRun = false;
    }
  }
}
