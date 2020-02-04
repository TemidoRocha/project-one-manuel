const $canvas = document.querySelector('canvas');

let game = new Game($canvas);

//console.dir($canvas);

game.ctx.drawImage(intro, 50, 50, 700, 400);
