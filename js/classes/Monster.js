Character.prototype.drawMonster = function () {
	this.grunt = document.getElementById('grunt');
	this.movementTime = 17;
	if (monster.x > player.x && monster.y < player.y) {
		monster.move(DIRECTION.DOWN, map);
	}
	else if (monster.x > player.x && monster.y > player.y) {
		monster.move(DIRECTION.UP, map);
	}
	if (monster.x < player.x && monster.y < player.y) {
		monster.move(DIRECTION.DOWN, map);
	}
	else if (monster.x < player.x && monster.y > player.y) {
		monster.move(DIRECTION.UP, map);
	}
	if (monster.x > player.x) {
		monster.move(DIRECTION.LEFT, map);
	}
	else if (monster.x <= player.x) {
		monster.move(DIRECTION.RIGHT, map);
	}
	if (String([player.x, player.y]) == String([monster.x, monster.y])) {
		player.life -= 0.5;
		grunt.play();
	}


		

}
