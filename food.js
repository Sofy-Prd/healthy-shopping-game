let junkFood=["images/hamburger.svg","images/donut.svg","images/fries.svg","images/jar.svg","images/sweet.svg","images/bacon.svg","images/pint.svg","images/pizza.svg","images/soda.svg","images/hotdog.svg"];
let healthyFood=["images/broccoli.svg","images/carrot.svg","images/avocado.svg","images/radish.svg","images/apple.svg","images/honey.svg","images/tomato.svg"];
let lotFood=["images/lotNutella.png","images/lotSoda.png","images/lotDonut.png"];

function random(from, to) {
  return (from + Math.random()*(to-from));
}

class Food {
  constructor(tablo,w) {
    const img = document.createElement('img');
    img.onload = () => {
      this.img = img;
      const imgRatio = img.naturalWidth/img.naturalHeight;
      this.w=w;
      this.h=this.w/imgRatio;
      this.x=random(0,W-this.w);
      this.y=0;
     
    }
    img.src = tablo[Math.floor(Math.random()*tablo.length)];

  }

  draw() {
    
      if (!this.img) return; // if `this.img` is not loaded yet => don't draw
      ctx.drawImage(this.img, this.x,this.y,this.w,this.h);
   
  }

  catch(trolley) {
    if ((trolley.x+trolley.w >= this.x && trolley.x <= this.x+this.w)
    &&
    (trolley.y <= this.y+this.h && trolley.y+trolley.h >= this.y))
    return true;
  }
}