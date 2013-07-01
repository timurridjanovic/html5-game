function Sword(url) {
	this.x = Math.floor((Math.random()*30)+1); // in tiles
	this.y = Math.floor((Math.random()*24)+1);
	this.score = 0;

	
	
	// Loading img in image attribute
	this.image = new Image();
	this.image.onload = function() {
		if(!this.complete) 
			throw "Loading error for sprite: \"" + url + "\".";
		
		// Size of character
	}
	this.image.src = "sprites/" + url;
}



Sword.prototype.drawSword = function(context) {
	var obstacles = map.obstacles.coords
	
	for (var i = 0; i < obstacles.length; i++) {
		var obstacle = String(obstacles[i]);
		
		if(String([this.x, this.y]) == obstacle || this.x < 2 || this.y < 2 ) {
		    this.deleteSword();
		}
	}

	context.drawImage(
		this.image, 
		this.x*32, this.y*32
	);
}


Sword.prototype.deleteSword = function() {
	map.swords.length = 0;
	this.x = Math.floor((Math.random()*30)+1); // in tiles
	this.y = Math.floor((Math.random()*24)+1);
	map.addSword(sword);
}
