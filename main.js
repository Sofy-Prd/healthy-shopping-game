let trolley;
let junkFoodGame;
let healthyFoodGame;
let junk;
let healthy;
let gameover;
let points;
let level;
let pointMaxLevel
let speedJunk;
let speedHealthy;
let moduloFrameJunk;
let moduloFrameHealthy;

function barre (){
  document.getElementById("health").value = points;
  document.getElementById("health").max=pointMaxLevel;
  document.getElementById("numberLevel").innerHTML=`Level ${level}`;
  document.getElementById("points").innerHTML=`${points} sur ${pointMaxLevel}`;
}


function init (){
  junkFoodGame=[];
  healthyFoodGame=[];
  points=0;
  level=0;
  pointMaxLevel=3
  speedJunk=5;
  speedHealthy=3;
  moduloFrameJunk=200;
  moduloFrameHealthy=300;
  gameover = false;
  document.querySelector(".canvas").style.background="#ddf072";
  barre()
}

const ctx = document.querySelector('canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;




function draw() {
  ctx.clearRect(0,0,W,H);
  trolley.draw();

    
  if (frames % moduloFrameJunk === 0) {
    junk = new Food(junkFood);
    junkFoodGame.push(junk);
  }

  junkFoodGame.forEach(function (junk) {
    junk.y += speedJunk;
    junk.draw();
  });

  if (frames % moduloFrameHealthy === 0) {
    healthy = new Food(healthyFood);
    healthyFoodGame.push(healthy);
  }

  healthyFoodGame.forEach(function (healthy) {
    healthy.y += speedHealthy;
    healthy.draw();
  });

  
  
  for (healthy of healthyFoodGame) {
    if (healthy.catch(trolley)) {
      healthyFoodGame.splice(healthyFoodGame.indexOf(healthy),1),
      points +=1;
      barre();
          
    }
  }

  for (junk of junkFoodGame) {
    if (junk.catch(trolley)) {
      points -=2;
      junkFoodGame.splice(junkFoodGame.indexOf(junk),1);
      barre();
        
    }
  }

// ######   ######   #######  ########  ######## 
// ##    ## ##    ## ##     ## ##     ## ##       
// ##       ##       ##     ## ##     ## ##       
//  ######  ##       ##     ## ########  ######   
//       ## ##       ##     ## ##   ##   ##       
// ##    ## ##    ## ##     ## ##    ##  ##       
//  ######   ######   #######  ##     ## ######## 

  // var xScore =150;
  // var yScore=50;
  // var scoreText=`SCORE = ${points}`;
  // ctx.fillStyle = "red";
  // ctx.font = '50px serif';
  // ctx.fillText(scoreText, xScore, yScore, 300);

  // var xLevel =500;
  // var yLevel=50;
  // var levelText=`level of good health = ${level}`;
  // ctx.fillStyle = "green";
  // ctx.font = '50px serif';
  // ctx.fillText(levelText, xLevel, yLevel, 300);

// ##       ######## ##     ## ######## ##       
// ##       ##       ##     ## ##       ##       
// ##       ##       ##     ## ##       ##       
// ##       ######   ##     ## ######   ##       
// ##       ##        ##   ##  ##       ##       
// ##       ##         ## ##   ##       ##       
// ######## ########    ###    ######## ######## 
  
  
  

  if (points===3) {

    level=1;
    pointMaxLevel=6;
    document.querySelector(".levelOne").classList.remove("dontDisplay");
    setTimeout(function(){ document.querySelector(".levelOne").classList.add("dontDisplay");},5000);
    document.querySelector(".canvas").style.background="#7ef76e";
    speedJunk=6;
    speedHealthy=5;
    trolley.speed=65;
    moduloFrameJunk=100;
    moduloFrameHealthy=250;
  
  }

  if (points===6) {
    level=2;
    pointMaxLevel=10;
    document.querySelector(".levelTwo").classList.remove("dontDisplay");
    setTimeout(function(){ document.querySelector(".levelTwo").classList.add("dontDisplay");},5000);
    document.querySelector(".canvas").style.background="#4df547";
    speedJunk=9;
    speedHealthy=7;
    trolley.speed=80;
    moduloFrameJunk===50;
    moduloFrameHealthy===100;

   
  }

  if (points<0) {
   gameover=true;
   document.querySelector(".gameOver").classList.remove("dontDisplay");
   document.querySelector(".barreDeSante").classList.add("dontDisplay");
   document.querySelector(".canvas").classList.add("dontDisplay");

} 
}
// #######  ##    ## ##    ## ######## ##    ## 
// ##     ## ###   ## ##   ##  ##        ##  ##  
// ##     ## ####  ## ##  ##   ##         ####   
// ##     ## ## ## ## #####    ######      ##    
// ##     ## ##  #### ##  ##   ##          ##    
// ##     ## ##   ### ##   ##  ##          ##    
//  #######  ##    ## ##    ## ########    ##    


document.onkeydown = function (e) {
  if (!trolley) return;

  if (e.keyCode===37) {
    trolley.moveLeft();}
  
  if (e.keyCode===39) {
    trolley.moveRight();
  
  }
}



let frames = 0;
function animLoop() {
  frames++;
  draw()
  
  if (!gameover) {
    requestAnimationFrame(animLoop);
  }
}

function startGame() {
  init()
  trolley = new Trolley();
  points=0;
  
  draw();
  requestAnimationFrame(animLoop);
}

document.getElementById("start-button").onclick = function() {
  document.querySelector("header").classList.add("dontDisplay");
  document.querySelector(".canvas").classList.remove("dontDisplay");
  document.querySelector(".barreDeSante").classList.remove("dontDisplay");
  startGame();
};

document.getElementById("restart-button").onclick = function() {
  
  document.querySelector(".gameOver").classList.add("dontDisplay");
  document.querySelector(".canvas").classList.remove("dontDisplay");
  document.querySelector(".barreDeSante").classList.remove("dontDisplay");
  startGame();
  
};

// startGame();