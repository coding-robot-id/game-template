
//Sets the background image. In Brackets, hover your mouse over 
//the string text below to see the image that's being used.
var background = new Raster("images/background.png", [400, 300]);
background.position = view.center;

//Creates a Player object and sets properties
var player = new Raster("images/player.png", [400, 500]);
player.alive = true;
player.visible = true;

var playerSpeed = 5;

//Moves the player
player.onFrame = function(event){
    if(Key.isDown('left') && player.position.x > 50){
        player.translate(-playerSpeed, 0);
    }
    if(Key.isDown('right') && player.position.x < 750){
        player.translate(playerSpeed, 0);
    }
} 
var fallSpeed = 5;
//Create a function to create more
//stalactites whenever you want!
function Stalactite(xPosition){
    
    //Sets the stalctite texture.
    this.stalactite = new Raster("images/fire.png", [xPosition, 10]);
    
    //This function moves the stalactites to a new random x-position when 
    //the function is called.
    this.stalactite.reposition = function(){
        this.position.y = Math.random() *(0 + 50) -50;
        this.position.x = Math.random() * (800);
    };
    
    //Moves the stalactite down on screen.
    this.stalactite.onFrame = function(event){
        this.translate(0, fallSpeed);
        if(this.position.y > 600){
            this.reposition();
        }
    };
}

position = 20;
numberOfStalactites = 10;
obstacles = [];
//var tempVariable = new Stalactite(position);
for(var i = 0; i < numberOfStalactites; i++){
    //Creates an initial space over the player.
    if(position > 300 && position < 450){
        position += 175;
    }
    else{
        position += 50;
    }
    var tempVariable = new Stalactite(position);
    obstacles.push(tempVariable);
}


var score = 0;
var scoreText = new PointText(new Point(10, 30));
scoreText.fillColor = 'black';
scoreText.fontSize = 24;
scoreText.content = "Score: " + score;

function onFrame(event){
    if(player.alive){
        //Adds to the score and updates the display.
        score += 25;
        scoreText.content = "Score: " + score;
        for(var i = 0; i < obstacles.length; i++){
            //Check if a stalactite hit the player.
            if(obstacles[i].stalactite.bounds.intersects(player.bounds)){
                //End the game.
                gameOver();
                player.alive = false;
            }
        } 
    }
}

//This runs when the game ends.
function gameOver(){
    player.visible = false;
    for(var i = 0; i < obstacles.length; i++){
        obstacles[i].stalactite.visible = false;
    }
}
