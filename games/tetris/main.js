/*Deklarasi Variable*/
var canvas 		= document.getElementById('tetrisCan'),
	ctx    		= canvas.getContext('2d'),
	popup       = document.getElementById('popup'),
	cp          = document.getElementById('c-p'),
	colors 		= [
					/*Color pieces*/
					null,
					'#ff44ff',
					'#ffff44',
					'#ff8800',
					'#44ffff',
					'#44ff44'
					],
	player 		 = {
					pos: {x: 0, y: 0},
					pixel: null,
					score: 0,
				   },
	arena  		 = createPixel(10, 20), //create arena tetris with 10 units horizontal line and 20 vertikal line
	dropCounter  = 0;
	dropInterval = 1000,
	dropSpeed    = 0,
	lastTime     = 0,
	game         = true;

ctx.scale(20,20); //Size Pieces

function arenaSweep() {
	var rowCount = 1;
	outer: for (var y = arena.length - 1; y > 0; --y) {
		for (var x = 0; x < arena[y].length; ++x) {
			if (arena[y][x] === 0) {
				continue outer;
			}
		}

		var row = arena.splice(y, 1)[0].fill(0);
		arena.unshift(row);
		++y;

		player.score += rowCount;
		rowCount *= 2 - 1;

		speedUp();
	}
}

function collide(arena, player) {
	var [p, o] = [player.pixel, player.pos];
	for (var y = 0; y < p.length; ++y) {
		for (var x = 0; x < p[y].length; ++x) {
			if (p[y][x] !== 0 &&
				(arena[y + o.y] && arena[y + o.y][x + o.x]) !== 0) {
				return true;
			}
		}
	}
	return false;
}

function createPixel(w, h) {
	var pixel = [];
	while (h--) {
		pixel.push(new Array(w).fill(0));
	}

	return pixel;
}

/*For Create Pieces*/
function createPiece(type) {
	if (type === 'T') {
		return [
			[0,0,0],
			[1,1,1],
			[0,1,0],
		];
	} else if (type === 'O') {
		return [
			[2,2],
			[2,2],
		];
	} else if (type == 'L') {
		return [
			[0,3,0],
			[0,3,0],
			[0,3,3],
		];
	} else if (type === 'I') {
		return [
			[0,4,0,0],
			[0,4,0,0],
			[0,4,0,0],
			[0,4,0,0],
		];
	} else if (type === 'Z') {
		return [
			[5,0,0],
			[5,5,0],
			[0,5,0],
		];
	}
}

/*Draw Background Canvas*/
function draw() {
	ctx.fillStyle = '#000';
	ctx.fillRect(0,0, canvas.width, canvas.height);

	drawPixel(arena, {x: 0, y: 0});
	drawPixel(player.pixel, player.pos);
}

/*Draw Piece perpixel*/
function drawPixel(pixel, offset) {
	pixel.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				ctx.fillStyle = colors[value];
				ctx.fillRect(x + offset.x,
							 y + offset.y,
							 1, 1);
			}
		});
	});
}

function merge(arena, player) {
	player.pixel.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}

function playerDrop() {
	player.pos.y++;
	if (collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		playerReset();
		arenaSweep();
		updateScore();
	}
	dropCounter = 0;
}

function playerMove(dir) {
	player.pos.x += dir;
	if (collide(arena, player)) {
		player.pos.x -= dir;
	}
}

function playerReset() {
	if (game == true) {
		var pieces   = 'TOLIZ';
		player.pixel = createPiece(pieces[pieces.length * Math.random() | 0]);
		player.pos.y = 0;
		player.pos.x = (arena[0].length / 2 | 0) - (player.pixel[0].length / 2 | 0);
		if (collide(arena, player)) {
			/*arena.forEach(row => row.fill(0));
			player.score = 0;
			updateScore();*/
			showPopup();
			game = false;
		}
	}
}

function playerRotate(dir) {
	var pos = player.pos.x;
	var offset = 1;
	rotate(player.pixel, dir);
	while (collide(arena, player)) {
		player.pos.x += offset;
		offset -= -(offset + (offset > 0 ? 1 : -1));
		if (offset > player.pixel[0].length) {
			rotate(player.pixel, -dir);
			player.pos.x = pos;
			return;
		}
	}
}

/*To showPopup when game over*/
function showPopup() {
	cp.innerHTML = "<h3>Game Over!</h3> <span>Your scroe is : " + player.score + "</span> <br> <button id='retry' onclick='return restartGame()'>Retry Game</button>";
	popup.style.display = 'flex';
}

/*To Restart Game When Game Over*/
function restartGame() {
	player.score = 0;
	playerReset();
	updateScore();
	game = true;
	popup.style.display = 'none';
	dropSpeed = 0;
	dropInterval = 1000;
	arena.forEach(row => row.fill(0));
}

/*To rotate piece*/
function rotate(pixel, dir) {
	for (var y = 0; y < pixel.length; ++y) {
		for (var x = 0; x < y; ++x) {
			[
				pixel[x][y],
				pixel[y][x],
			] = [
				pixel[y][x],
				pixel[x][y],
			];
		}
	}

	if (dir > 0) {
		pixel.forEach(row => row.reverse());
	} else {
		pixel.reverse();
	}
}

function update(time = 0) {
	var deltaTime = time - lastTime;
	lastTime = time;
	
	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		playerDrop();
	}

	draw();
	requestAnimationFrame(update);
}

/*For Update Score*/
function updateScore() {
	document.getElementById('score').innerHTML = "<h2>Your Score : " + player.score + "</h2>";
}

/*For Speed Up pieces*/
function speedUp() {
	dropSpeed++;

	if (dropSpeed === 10) {
		if (dropInterval !== 0) {
			dropSpeed = 0;
			dropInterval -= 200;
		}
	}
}

/*For Keydown event(arrow button)*/
document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		playerMove(-1);
	} else if (event.keyCode == 39) {
		playerMove(1);
	} else if (event.keyCode == 40) {
		playerDrop();
	} else if (event.keyCode == 38) {
		playerRotate(-1);
	}
});

/*Call Function*/
playerReset();
updateScore();
update();