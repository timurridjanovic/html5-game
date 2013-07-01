var DIRECTION = {
	"DOWN" : 0,
	"LEFT" : 1,
	"RIGHT": 2,
	"UP"   : 3
}

var ANIMATION_TIME = 4;
var MOVEMENT_TIME = 15;

function Character(url, x, y, direction) {
	this.x = x; // in tiles
	this.y = y;
	this.life = 100;
	this.direction = direction;
	this.stateAnimation = -1;
	this.movementTime = MOVEMENT_TIME;
	
	// Loading img in image attribute
	this.image = new Image();
	this.image.referenceCharacter = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw "Loading error for sprite: \"" + url + "\".";
		
		// Size of character
		this.referenceCharacter.width = this.width / 4;
		this.referenceCharacter.height = this.height / 4;
	}
	this.image.src = "sprites/" + url;
}

Character.prototype.drawCharacter = function(context) {
	var frame = 0; // Number of image for animation
	var gapX = 0, gapY = 0; // We need to apply a gap to the character position
	if(this.stateAnimation >= this.movementTime) {
		this.stateAnimation = -1;
	} else if(this.stateAnimation >= 0) {
		frame = Math.floor(this.stateAnimation / ANIMATION_TIME);
		if(frame > 3) {
			frame %= 4;
		}
		
		// Number of pixels left to travel between 2 tiles
		var pixelsToTravel = 32 - (32 * (this.stateAnimation / this.movementTime));
		
		if(this.direction == DIRECTION.UP) {
			gapY = pixelsToTravel;
		} else if(this.direction == DIRECTION.DOWN) {
			gapY = -pixelsToTravel;
		} else if(this.direction == DIRECTION.LEFT) {
			gapX = pixelsToTravel;
		} else if(this.direction == DIRECTION.RIGHT) {
			gapX = -pixelsToTravel;
		}
		
		this.stateAnimation++;
	}
	
	context.drawImage(
		this.image, 
		this.width * frame, this.direction * this.height, // Point of origin
		this.width, this.height, // Size of the source image
		// Point of destination (depends on the size of the character)
		(this.x * 32) - (this.width / 2) + 16 + gapX, (this.y * 32) - this.height + 24 + gapY,
		this.width, this.height // Size of the destination image (size of the character)
	);
}

Character.prototype.getNextCoordinates = function(direction) {
	var coord = {'x' : this.x, 'y' : this.y};
	switch(direction) {
		case DIRECTION.DOWN : 
			coord.y++;
			break;
		case DIRECTION.LEFT : 
			coord.x--;
			break;
		case DIRECTION.RIGHT : 
			coord.x++;
			break;
		case DIRECTION.UP : 
			coord.y--;
			break;
	}
	return coord;
}

Character.prototype.move = function(direction, map) {
	// We can't move if a movement is in process
	if(this.stateAnimation >= 0) {
		return false;
	}

	// We change the direction of the character
	this.direction = direction;
		
	// We verify that the needed tile is in the map
	var nextTile = this.getNextCoordinates(direction);
	var obstacles = map.obstacles.coords
	var swordAudio = document.getElementById('sword');
	
	for (var i = 0; i < obstacles.length; i++) {
		var obstacle = String(obstacles[i]);
		
		if(String([nextTile.x, nextTile.y]) == obstacle) {
		    return false;
		}
	}

	// check if character took sword...
	if (String([player.x, player.y]) == String([sword.x, sword.y])) {
		swordAudio.play();
		sword.deleteSword();
		sword.score++;

	}


	if(nextTile.x < 2 || nextTile.y < 2 || nextTile.x+2 > map.getWidth() || nextTile.y > map.getHeight()) {
		// We return a boolean that indicates that the movement will not take place
		return false;
	}


	
	// We start the animation
	this.stateAnimation = 1;
		
	// We apply the movement
	this.x = nextTile.x;
	this.y = nextTile.y;
		
	return true;
}
