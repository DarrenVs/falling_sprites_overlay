
function scene_default(canvas, ctx) {

    // The shameless credits that fade away after launch
    var credit = new Text(
        canvas.width*.5, canvas.height-25, 300, 50,
        {text:"Created by DarrenVs",textAlign:"center",fillStyle:"rgba(108, 108, 108)",font:"26px Lucida Console"}
    );
    var creditsAlpha = 1;
    var fadeTime = 7;

    // The objects to be rendered
    this.objects = [
        credit
    ];


    this.draw = function(canvas, ctx) {

    }

    // Update loop
    this.update = function(delta) {
        


        // Fade credits away
        if (creditsAlpha > 0) {
            credit.textStyle.fillStyle = "rgba(108, 108, 108, "+ creditsAlpha +")";
            creditsAlpha -= (1/fadeTime) * delta;

            return true;
        }
    }
}
