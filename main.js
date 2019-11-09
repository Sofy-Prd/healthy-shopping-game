let trolley;
let junkFoodGame;
let healthyFoodGame;
let lotFoodGame;
let junk;
let healthy;
let lot;
let stopGame;
let points;
let beforePoints;
let level;
let pointMaxLevel
let speedJunk;
let speedHealthy;
let moduloFrameJunk;
let moduloFrameHealthy;
let levelOneaffiche;
let levelTwoaffiche;
let levelThreeaffiche;
let AmbulanceAudio = new Audio('audio/ambulance.mp3');
let HealthyAudio = new Audio('audio/good.mp3');
let JunkAudio = new Audio('audio/bad.mp3');
let lotAudio = new Audio('audio/lotSound.mp3');
let levelUpAudio= new Audio('audio/Level_Up.mp3');
let levelDownAudio=new Audio('audio/LevelDown.mp3');
let winAudio=new Audio('audio/bravo.mp3')


//fonction qui affiche la barre de progression et le score
function barre (){
  document.getElementById("health").value = points;
  document.getElementById("health").max=pointMaxLevel;
  document.getElementById("numberLevel").innerHTML=`Level ${level}`;
  document.getElementById("points").innerHTML=`${points} sur ${pointMaxLevel}`;
}

// fonction de réinitiation quand on veut rejouer
function init (){
  junkFoodGame=[];
  healthyFoodGame=[];
  lotFoodGame=[];
  points=0;
  beforePoints=0;
  level=0;
  pointMaxLevel=3
  speedJunk=5;
  speedHealthy=3;
  moduloFrameJunk=200;
  moduloFrameHealthy=300;
  levelOneaffiche=false;
  levelTwoaffiche=false;
  levelThreeaffiche=false;
  stopGame = false;
  document.querySelector(".canva").style.background="#f2b264";
  barre()
}

//initialisation canvas
const ctx = document.querySelector('canvas').getContext('2d');
const W = ctx.canvas.width;
const H = ctx.canvas.height;




function draw() {
  ctx.clearRect(0,0,W,H);
  trolley.draw();

    
  if (frames % moduloFrameJunk === 0) {
    junk = new Food(junkFood,50);
    junkFoodGame.push(junk);
  }

  junkFoodGame.forEach(function (junk) {
    junk.y += speedJunk;
    junk.draw();
  });

  if (frames % moduloFrameHealthy === 0) {
    healthy = new Food(healthyFood,50);
    healthyFoodGame.push(healthy);
  }

  healthyFoodGame.forEach(function (healthy) {
    healthy.y += speedHealthy;
    healthy.draw();
  });

  
  
  for (healthy of healthyFoodGame) {
    if (healthy.catch(trolley)) {
      HealthyAudio.play();
      healthyFoodGame.splice(healthyFoodGame.indexOf(healthy),1);
      beforePoints=points;
      points +=1;
      barre();
          
    }
  }

  for (junk of junkFoodGame) {
    if (junk.catch(trolley)) {
      JunkAudio.play();
      beforePoints=points;
      points -=2;
      junkFoodGame.splice(junkFoodGame.indexOf(junk),1);
      barre();
        
    }
  }

  if(level===3){
    let salesImg=new Image();
    salesImg.src="images/sales.png";
    ctx.drawImage(salesImg, 250,5,400,100);
    
  }

  if (level===3 && (frames % moduloFrameJunk === 0)) {
    lot = new Food(lotFood,150);
    lotFoodGame.push(lot);
  }

  lotFoodGame.forEach(function (lot) {
    lot.y += 5;
    lot.draw();
  });

  for (lot of lotFoodGame) {
    if (lot.catch(trolley)) {
      lotAudio.play();
      lotFoodGame.splice(lotFoodGame.indexOf(lot),1);
      beforePoints=points;
      points -=6;
      barre();
          
    }
  }


// ##       ######## ##     ## ######## ##       
// ##       ##       ##     ## ##       ##       
// ##       ##       ##     ## ##       ##       
// ##       ######   ##     ## ######   ##       
// ##       ##        ##   ##  ##       ##       
// ##       ##         ## ##   ##       ##       
// ######## ########    ###    ######## ######## 
  
  //level0
  if (points>=0 && points<3 ) {
    level=0;
    levelOneaffiche=false;
    barre();
  }

  //level1
   if (points===3 && beforePoints<points && levelOneaffiche===false){

    levelUpAudio.play();
    document.querySelector(".levelOne").classList.remove("dontDisplay");
    document.querySelector(".logo").classList.add("dontDisplay");
  
    setTimeout(function(){ 
      document.querySelector(".levelOne").classList.add("dontDisplay");
      document.querySelector(".logo").classList.remove("dontDisplay"); 
    },3000); 

    levelOneaffiche=true;
 
  }

  if (points>=3 && points<6) {
    level=1;
    pointMaxLevel=6;
    barre();
    document.querySelector(".canva").style.background="#dcf04c";
    speedJunk=6;
    speedHealthy=5;
    moduloFrameJunk=100;
    moduloFrameHealthy=250;
    levelTwoaffiche=false;
  }

  //level2
  if (points===6 && beforePoints<points && levelTwoaffiche===false){
    document.querySelector(".levelTwo").classList.remove("dontDisplay");
    document.querySelector(".logo").classList.add("dontDisplay");
  
    setTimeout(function(){ 
      document.querySelector(".levelTwo").classList.add("dontDisplay");
      document.querySelector(".logo").classList.remove("dontDisplay"); 
    },3000); 
    levelUpAudio.play();
    levelOneaffiche=false;
    levelTwoaffiche=true;
    
  }    
  

  if (points>=6 && points<10) {
    level=2;
    pointMaxLevel=10;
    barre();
    document.querySelector(".canva").style.background="#aad041";
    speedJunk=9;
    speedHealthy=7;
    moduloFrameJunk===50;
    moduloFrameHealthy===100;
    levelThreeaffiche=false;
    
   }

  //level3
  if (points===10 && beforePoints<points && levelThreeaffiche===false){
    document.querySelector(".levelThree").classList.remove("dontDisplay");
    document.querySelector(".logo").classList.add("dontDisplay");

    setTimeout(function(){ 
      document.querySelector(".levelThree").classList.add("dontDisplay");
      document.querySelector(".logo").classList.remove("dontDisplay"); 
    },3000); 
    levelUpAudio.play();
    levelTwoaffiche=false;
    levelThreeaffiche=true;
  }
  if (points>=10 && points<15) {
    level=3;
    pointMaxLevel=15;
    barre();
    document.querySelector(".canva").style.background="#54992e";
    speedJunk=12;
    speedHealthy=9;
    moduloFrameJunk===50;
    moduloFrameHealthy===50;
    
 
  }

  //Game Over
  if (points<0) {
   stopGame=true;
   levelThreeaffiche=false;
   var player = document.querySelector('#' + 'audioPlayer');
   if (player.play) {
    player.pause();
    this.textContent = 'Pause';
  }
   document.querySelector(".gameOver").classList.remove("dontDisplay");
   document.querySelector(".game-board").classList.add("dontDisplay");
   document.querySelector(".barreDeSante").classList.add("dontDisplay");
   document.querySelector(".canva").classList.add("dontDisplay");
   AmbulanceAudio.play();

} 

  //Win
  if (points>15) {
    stopGame=true;
    levelThreeaffiche=false;
    var player = document.querySelector('#' + 'audioPlayer');
   if (player.play) {
    player.pause();
    this.textContent = 'Pause';
  }
    document.querySelector(".win").classList.remove("dontDisplay");
    document.querySelector(".game-board").classList.add("dontDisplay");
    document.querySelector(".barreDeSante").classList.add("dontDisplay");
    document.querySelector(".canva").classList.add("dontDisplay");
    winAudio.play();


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
  
  if (!stopGame) {
    requestAnimationFrame(animLoop);
  }
}

function startGame() {
  init()
  play('audioPlayer', this)
  trolley = new Trolley();
  points=0;
  draw();
  requestAnimationFrame(animLoop);
}

// ########  ##     ## ######## ########  #######  ##    ## 
// ##     ## ##     ##    ##       ##    ##     ## ###   ## 
// ##     ## ##     ##    ##       ##    ##     ## ####  ## 
// ########  ##     ##    ##       ##    ##     ## ## ## ## 
// ##     ## ##     ##    ##       ##    ##     ## ##  #### 
// ##     ## ##     ##    ##       ##    ##     ## ##   ### 
// ########   #######     ##       ##     #######  ##    ## 

document.getElementById("start-button").onclick = function() {
  document.querySelector("header").classList.add("dontDisplay");
  document.querySelector(".game-board").classList.remove("dontDisplay");
  document.querySelector(".canva").classList.remove("dontDisplay");
  document.querySelector(".barreDeSante").classList.remove("dontDisplay");
  document.querySelector(".scoreBottom").classList.remove("dontDisplay");
  document.querySelector(".logo").classList.remove("dontDisplay");
  startGame();
};

document.getElementById("restart-button").onclick = function() {
  document.querySelector(".game-board").classList.remove("dontDisplay");
  document.querySelector(".canva").classList.remove("dontDisplay");
  document.querySelector(".barreDeSante").classList.remove("dontDisplay");
  document.querySelector(".scoreBottom").classList.remove("dontDisplay");
  document.querySelector(".gameOver").classList.add("dontDisplay");
  document.querySelector(".logo").classList.remove("dontDisplay");
  
  startGame();
  
};

document.getElementById("restart-button2").onclick = function() {
  document.querySelector(".game-board").classList.remove("dontDisplay");
  document.querySelector(".canva").classList.remove("dontDisplay");
  document.querySelector(".barreDeSante").classList.remove("dontDisplay");
  document.querySelector(".scoreBottom").classList.remove("dontDisplay");
  document.querySelector(".logo").classList.remove("dontDisplay");
  document.querySelector(".win").classList.add("dontDisplay");
  startGame();
  
};

//Audio
function play(idPlayer, control) {
  var player = document.querySelector('#' + idPlayer);
  var img = document. getElementById("btplaypause")
  if (player.paused) {
      player.play();
      control.textContent = 'Pause';
      img.src = "images/soundOn.png";
  } else {
      player.pause();	
      control.textContent = 'Play';
      img.src = "images/soundOff.png";
  }
}




