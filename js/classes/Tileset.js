function Tileset(url) {
	// Loading of image in the image attribute
	this.image = new Image();
	this.image.tilesetReference = this;
	this.image.onload = function() {
		if(!this.complete) 
			throw new Error("Loading error from tileset: \"" + url + "\".");
		
		// Width of tileset in tiles
		this.tilesetReference.width = this.width / 32;
	}
	this.image.src = "tilesets/" + url;
}

// Drawing method for the tile number in the 2D "context" at xDestination and yDestination coordinates
Tileset.prototype.drawTile = function(number, context, xDestination, yDestination) {
	var xSourceTiles = number % this.width;
	if(xSourceTiles == 0) xSourceTiles = this.width;
	var ySourceTiles = Math.ceil(number / this.width);
	
	var xSource = (xSourceTiles - 1) * 32;
	var ySource = (ySourceTiles - 1) * 32;
	
	context.drawImage(this.image, xSource, ySource, 32, 32, xDestination, yDestination, 32, 32);
}
