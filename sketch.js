var car, road, skull;
var carImg, roadImg, coinImg, skullImg;
var score = 0;
var gameState = "PLAY";

function preload(){
    carImg = loadImage("carImg.png");
    roadImg = loadImage("roadImg.png");
    coinImg = loadImage("coinImg.png");
    skullImg = loadImage("skullImg.png");
}

function setup() {

    createCanvas(windowWidth,windowHeight);

    //create road

    road = createSprite(width/2,200);
    road.addImage(roadImg);
    road.velocityY = 4;

    //create car

    car = createSprite(width/2, height - 150);
    car.addImage(carImg);
    car.velocityY = 0;
    car.scale = 0.03;

    //create coins group

    coinGroup = new Group();

    coinImg.scale = 0.5;
    //create skull group

    skullGroup = new Group();

    textSize(20);
}

function draw() {

background(0);

if(gameState == "PLAY"){
    // Move the car based on user input
    if (keyDown("LEFT_ARROW")) {
        car.x -= 5;
    } else if (keyDown("RIGHT_ARROW")) {
        car.x += 5;
    }

    //code the road to reset
  
    if(road.y > height ){
        road.y = height/2;
    }

    if (World.frameCount % 60 == 0) {
        var coin = createSprite((Math.round(random(50, width-50),40, 10, 10)));
        coin.addImage(coinImg);
        coin.scale=0.12;
        coin.velocityY = 5;
        coin.lifetime = 200;
        coinGroup.add(coin);
        coin.scale = 0.07;
    }

    if (World.frameCount % 60 == 0) {
        var skull = createSprite((Math.round(random(50, width-50),40, 10, 10)));
        skull.addImage(skullImg);
        skull.scale=0.12;
        skull.velocityY = 5;
        skull.lifetime = 200;
        skullGroup.add(skull);
        skull.scale = 0.07;

    }

    if (car.isTouching(coinGroup)) {
        coinGroup.collide(car, function(coin) {
          score += 20;
          coin.remove();
        });
      }
    

}
if(gameState == "END"){
    textSize(50);
    fill(255,0,0);
    text("YOU LOST", width/2 - 100, height/2);
    textSize(30);
    text("GAME OVER",width/2 - 100,height/2 + 50);
    car.destroy();
    



}
else if(gameState == "WON"){
    textSize(50);
    fill(31.4,78.4,47.1);
    text("YOU WON", width/2 - 90, height/2);
    textSize(30);
    text("CONGRATULATIONS!",width/2 - 100,height/2 + 50);
    car.destroy();
    skullGroup.destroyEach();
    coinGroup.destroyEach();
}
    




    drawSprites();
    text("Score: "+ score,width-150,30);

    if (car.isTouching(skullGroup)){
        score = 0;
        coinGroup.destroyEach();
        skullGroup.destroyEach();
        gameState = "END";
    }

    if(score >= 200){
        gameState = "WON";
    }


}


