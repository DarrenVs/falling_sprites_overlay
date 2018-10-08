
function scene_default(canvas, ctx) {

    // The shameless credits that fade away after launch
    this.credit = new Text(
        canvas.width*.5, canvas.height-25, 300, 50,
        {text:"Created by DarrenVs",textAlign:"center",fillStyle:"rgba(108, 108, 108)",font:"26px Lucida Console"}
    );
    this.creditsAlpha = 1;
    this.fadeTime = 7;

    // Drop sprites
    this.spinner = 0;
    this.dropRate = 0.01; // Per second
    this.size = {min:15, max:100};
    this.dropSpeed = {min:1800, max:2550};
    this.rotateSpeed = {min: -Math.PI*2, max: Math.PI*2};
    this.nextSprite = 0; // Timer when next sprite drops
    this.sprites = [
        './images/Trix.png',
        // './images/ErstadHappy.png',
        // // // // './images/KappaPride.png',
        './images/bit_1.png',
        './images/bit_2.png',
        './images/bit_1.png',
        './images/bit_2.png',
        './images/bit_1.png',
        './images/bit_2.png',
        './images/bit_1.png',
        './images/bit_2.png',
        // // // './images/EleGiggle.png',
        // // // './images/BuddhaBar.png',
        // './images/DendiFace.png',
        // './images/Sleep.png',
        // './images/Stunned.png',
        // './images/Hacked.png',
    ]

    // Cooldown to destroy out of screen sprites
    this.deleteBoundsRadius = Math.max(canvas.height, canvas.width);
    this.checkRate = 1; // Per second
    this.nextCheck = 0; // Timer when next check triggers

    // The objects to be rendered
    this.objects = [
        this.credit,
    ];
}


scene_default.prototype.draw = function(canvas, ctx) {

    ctx.beginPath();
    canvas_arc(ctx, canvas.width*.5, canvas.height*.5, this.deleteBoundsRadius, 0, Math.PI*2, {strokeStyle:"#F0F", lineWidth:4})
    ctx.stroke();
}

// Update loop
scene_default.prototype.update = function(delta, currentTime) {

    var shouldDraw = false;

    // Deploy sprites
    if (currentTime > this.nextSprite) {
        this.nextSprite += this.dropRate * 1000;
        var size = Math.random()*(this.size.max-this.size.min)+this.size.min;
        this.objects.push(
            new Sprite(
                canvas.width*.5,// Math.random() * canvas.width,
                canvas.height,// -200,
                size, size,
                {
                    rotation: this.spinner,//Math.random()*Math.PI/4,
                    // fallingVelocity: Vector.randomDirection().multiply(
                    //     Math.random()*(this.dropSpeed.max-this.dropSpeed.min)+this.dropSpeed.min
                    // ),
                    fallingVelocity: Vector.fromAngles(this.spinner%Math.PI*2, -1).multiply(
                        Math.random()*(this.dropSpeed.max-this.dropSpeed.min)+this.dropSpeed.min
                    ),
                    gravity: new Vector(0, 2000),
                    drag: -.4,
                    rotationSpeed: Math.random()*(this.rotateSpeed.max-this.rotateSpeed.min)+this.rotateSpeed.min,
                    imageSrc: this.sprites[Math.floor(Math.random()*this.sprites.length)],
                    // dropSpeed: Math.random()*(this.dropSpeed.max-this.dropSpeed.min)+this.dropSpeed.min,
                    // rotationSpeed: Math.random()*(this.rotateSpeed.max-this.rotateSpeed.min)+this.rotateSpeed.min,

                }
            )
        )
        shouldDraw = true;
    }
    this.spinner += 2*delta;

    // Check to delete sprites
    if (currentTime > this.nextCheck) {
        this.nextCheck += this.checkRate * 1000;

        for (var i = this.objects.length-1; i >= 0; i--) {
            var object = this.objects[i];
            var objectDistance = new Vector(object.x-canvas.width*.5, object.y-canvas.height*.5).length();
            if (object.className == "Sprite" && objectDistance > this.deleteBoundsRadius)
                this.objects.splice(i, 1);
        }
    }


    // Fade credits away
    if (this.creditsAlpha > 0) {
        this.credit.textStyle.fillStyle = "rgba(108, 108, 108, "+ this.creditsAlpha +")";
        this.creditsAlpha -= (1/this.fadeTime) * delta;

        shouldDraw = true;
    }

    return shouldDraw
}
