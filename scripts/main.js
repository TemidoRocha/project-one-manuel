const $canvas = document.querySelector('canvas');

let game = new Game($canvas);

//console.dir($canvas);

game.ctx.drawImage(intro, 400, 400, 350, 75);
