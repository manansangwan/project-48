var ghost,ghostImg;
var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;

var invisibleBlock,invisibleBlockGroup;
var gameState = "play";

function preload(){
ghostImg = loadImage("ghost.png");
towerImg = loadImage("bg.jpg");
doorImg = loadImage("door.png")
climberImg = loadImage("climber.png")
}

function setup(){
createCanvas(600,600);
tower = createSprite(300,300);
tower.addImage(towerImg);
tower.velocityY = 1;
ghost = createSprite(200,200,50,50);
ghost.addImage(ghostImg);
ghost.scale = 0.4;

tower.scale = 1.8

doorsGroup = new Group();
climbersGroup = new Group();

invisibleBlockGroup = new Group();
}

function draw(){
background(0);
if(gameState === "play"){
if(keyDown("space")){
ghost.velocityY = -5;
}
ghost.velocityY = ghost.velocityY + 0.2;
if(keyDown("left_arrow")){
ghost.x = ghost.x-3;
}
if(keyDown("right_arrow")){
ghost.x = ghost.x+3       
}

if(tower.y>400){
tower.y = 300;
}

spawndoors();

if(climbersGroup.isTouching(ghost) ){
ghost.velocityY = 0;


}
if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
ghost.destroy();
gameState = "end";


}






drawSprites();
}

if(gameState === "end"){
stroke("yellow");
fill("yellow")
textSize(30);
text("game over",230,250);
}
}

function spawndoors(){
if(frameCount % 240 === 0){
door = createSprite(200,-50);
door.x = random(120,400);
door.addImage(doorImg);
door.velocityY = 1;
door.lifetime = 800;
doorsGroup.add(door);


climber = createSprite(200,10);
climber.x = door.x
climber.addImage(climberImg);
climber.velocityY = 1;
climber.lifetime = 800;
climbersGroup.add(climber);

invisibleBlock = createSprite(200,15);
invisibleBlock.width = climber.width;
invisibleBlock.height = 2;
invisibleBlock.x = door.x
invisibleBlock.velocityY = 1;
invisibleBlock.lifetime = 800;
invisibleBlock.debug = true;
invisibleBlockGroup.add(invisibleBlock);

ghost.depth = door.depth; 
ghost.depth += 1;
}
}