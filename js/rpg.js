

var map = new Map("map");

var player = new Character("squire.png", 7, 14, DIRECTION.DOWN);
var monster = new Character("monster.png", 25, 3, DIRECTION.DOWN);
var sword = new Sword("sword.png");
map.addCharacter(player);
map.addCharacter(monster);


map.addSword(sword);

window.onload = function () {
	var battleAudio = document.getElementById('battleAudio');
	
	var musicPlay = function(e) {
		battleAudio.play();
		battleAudio.addEventListener('ended', function() {battleAudio.play();});
	}

	musicPlay();
	main(battleAudio);
}

main = function(battleAudio) {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	
	canvas.width  = 1000;
	canvas.height = 800;
	
	
	var intervalId = setInterval(function() {
		map.drawMap(ctx);
		monster.drawMonster(ctx);
		if (player.life <= 0) {
			gameover(ctx, battleAudio);
			clearInterval(intervalId);
		}
	}, 40);


	
	// Keyboard management
	window.onkeydown = function(event) {
		// We get the key code
		var e = event || window.event;
		var key = e.which || e.keyCode;
		
		switch(key) {
			case 38 : case 122 : case 119 : case 90 : case 87 : // Up arrow, z, w, Z, W
				player.move(DIRECTION.UP, map);
				break;
			case 40 : case 115 : case 83 : // Down arrow, s, S
				player.move(DIRECTION.DOWN, map);
				break;
			case 37 : case 113 : case 97 : case 81 : case 65 : // Left arrow, q, a, Q, A
				player.move(DIRECTION.LEFT, map);
				break;
			case 39 : case 100 : case 68 : // Right arrow, d, D
				player.move(DIRECTION.RIGHT, map);
				break;
			default : 
				//alert(key);
				// If the key is of no use to us, we have no reason to block its normal behavior...
				return true;
		}
		
		return false;
	}

}

gameover = function (ctx, battleAudio) {
	var gameOverSound = document.getElementById('gameover');
	var soundPlayed = false;


	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, 1000, 800);
	ctx.font = "bold 40px Arial";
	ctx.fillStyle = "white";
	ctx.fillText('GAME OVER', 380, 400);
	ctx.fillText('SCORE: '+ sword.score, 410, 440);
	if (soundPlayed == false) {
		battleAudio.pause();
		monster.grunt.pause();
		gameOverSound.play();
		soundPlayed = true;
			}

}
