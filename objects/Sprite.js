



// Default restorepoint properties
defaultSpriteProperties = {
    imageSrc: "./images/Stunned.png",
    rotation: 0,
    fallingVelocity: new Vector(100, 300),
    gravity: new Vector(-100, 90),
    drag: -.4,
    rotationSpeed: 1,
}



// Sprite object
function Sprite(x, y, width, height, properties) {

	applyProperties(this, properties);

	// Framework properties
	this.x = x; this.y = y;
	this.width = width; this.height = height;
    this.defaultProperties = defaultSpriteProperties;
    this.className = "Sprite";

	// Object properties
	applyProperties(this, defaultSpriteProperties);
	// Custom object properties
	applyProperties(this, properties);

	// Object values
    this.image = new Image()
    this.image.src = this.imageSrc;

    this.gravity = this.gravity.clone();
    this.fallingVelocity = this.fallingVelocity.clone();
}


// Update loop
Sprite.prototype.update = function (delta) {


    this.rotation += this.rotationSpeed*delta;
    this.x += this.fallingVelocity.x*delta;
    this.y += this.fallingVelocity.y*delta;

    this.fallingVelocity.x += this.gravity.x*delta;
    this.fallingVelocity.y += this.gravity.y*delta;

    this.fallingVelocity.x -= this.fallingVelocity.x * this.drag * delta;
    this.fallingVelocity.y -= this.fallingVelocity.y * this.drag * delta;

    return true;
}

// Draw function
Sprite.prototype.draw = function (canvas, ctx) {

    ctx.rotate(this.rotation);

    var imageSizeScale = Math.min(this.width, this.height) / Math.max(this.image.width, this.image.height);
    canvas_render_image(ctx, this.image, this.image.width*-.5, this.image.height*-.5, this.image.width*imageSizeScale, this.image.height*imageSizeScale);
}
