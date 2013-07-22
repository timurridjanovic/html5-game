function Map(name) {
	// Creation of XmlHttpRequest object
	var xhr = getXMLHttpRequest();
		
	// Loading of file
	xhr.open("GET", './maps/' + name + '.json', false);
	xhr.send(null);
	if(xhr.readyState != 4 || (xhr.status != 200 && xhr.status != 0)) // Code == 0 for local
		throw new Error("Impossible to load map: \"" + name + "\" (code HTTP : " + xhr.status + ").");
	var mapJsonData = xhr.responseText;
	
	// Data analysis
	var mapData = JSON.parse(mapJsonData);
	this.tileset = new Tileset(mapData.tileset);
	this.land = mapData.land;
	
	// List of characters
	this.characters = new Array();
	this.swords = new Array();
}

// To get the height and width in tiles for the map
Map.prototype.getHeight = function() {
	var height = this.land.length/2;
	return height;
}
Map.prototype.getWidth = function() {
	return this.land[0].length;
}

// To add a character and sword

Map.prototype.addSword = function(sword) {
	this.swords.push(sword);
}

Map.prototype.addCharacter = function(char) {
	this.characters.push(char);
}



Map.prototype.drawMap = function(context) {
	for(var i = 0, l = this.land.length ; i < l ; i++) {
		var line = this.land[i];
		var y = i%25 * 32;
		for(var j = 0, k = line.length ; j < k ; j++) {
			this.tileset.drawTile(line[j], context, j * 32, y);
		}
	}
	
	// Drawing of characters and of swords

	for(var i = 0, l = this.swords.length ; i < l ; i++) {
		this.swords[i].drawSword(context);
	}

	for(var i = 0, l = this.characters.length ; i < l ; i++) {
		this.characters[i].drawCharacter(context);
	}
	
	// Drawing healh bar with text
	context.font = "bold 20px Arial";
	context.fillStyle = "white";
	context.fillText(
		'LIFE: '+player.life, 
		740, 20
	);	
	
	// Drawing score bar with text
	context.fillText(
		'SCORE: '+sword.score,
		850, 20
	);

}

Map.prototype.obstacles = {'coords': [[3, 2], [2, 2], [4, 2], [5, 2], [6, 2], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4]]};














