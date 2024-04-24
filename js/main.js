

class Bird {
    constructor(){
        this.width = 40
        this.height = 40
        this.positionY =200 - this.width / 2
        this.positionX = 100
        this.speedY = 0
        this.gravity = 0.2
        this.gravitySpeed = 0
 



        this.birdElm = document.getElementById("bird")
        this.birdElm.style.width = this.width + "px"
        this.birdElm.style.height = this.height + "px"
        this.birdElm.style.bottom = this.positionY + "px"
        this.birdElm.style.left = this.positionX + "px"

        document.addEventListener("keydown",(e) => {
            if(e.code === "Space"){
                bird.moveUp();
            }
            
        });
        this.moveDown();

    }

    moveUp(){
      this.speedY -= 5;
    }
    

    moveDown(){
        this.speedY += this.gravity
        this.positionY -= this.speedY
        if(this.positionY >  document.body.clientHeight - this.height){
            this.positionY = document.body.clientHeight - this.height
            this.speedY = 0;   
        }
        else if(this.positionY < 0){
            this.positionY = 0;
        }
        else if(this.positionY > 0 && this.positionY < 5){
            this.speedY = 1
            
        }
        this.birdElm.style.bottom = this.positionY + "px"
        requestAnimationFrame(this.moveDown.bind(this))
    
}
}




class Pipe {
    constructor(){
        this.width = 40 ;
        this.height = 72;
        this.minGap = 120 // gap between pipes
        this.maxGap = 200
        this.positionX = document.body.clientWidth
        this.bottomPipePositionY = 0;
        this.topPipePositionY = 0;
        this.bottomPipe = null;
        this.topPipe = null;
        this.createPipe();
        this.moveLeft()
    }
    createPipe(){
        const gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1)) + this.minGap
        
        const bottomPipePositionY = Math.floor(Math.random() * (document.body.clientHeight - gap))
        const topPipePositionY = document.body.clientHeight - bottomPipePositionY - gap
    
        
        
        
        //bottom pipe
        this.bottomPipe = document.createElement("div");
        this.bottomPipe.className = "pipes";
        this.bottomPipe.style.width = this.width + "px"
        this.bottomPipe.style.height = bottomPipePositionY + "px"  //bottomHeight
        this.bottomPipe.style.bottom = 0 + "px" // .this
        this.bottomPipe.style.left = this.positionX + "px"
    
        
        //top pipe
        this.topPipe = document.createElement("div");
        this.topPipe.className = "pipeTop";
        this.topPipe.style.width = this.width + "px";
        this.topPipe.style.height =topPipePositionY + "px"; //topHeight
        this.topPipe.style.top = 0 + "px"
        this.topPipe.style.left = this.positionX + "px"
        
        
        const newPipe = document.getElementById("background")
        newPipe.appendChild(this.bottomPipe)
        newPipe.appendChild(this.topPipe)
        
    }
    moveLeft(){
        this.positionX -= 1.5;
        this.bottomPipe.style.left = this.positionX + "px"
        this.topPipe.style.left = this.positionX + "px"
        if(this.positionX < 0 ){
            pipeArr.splice(0,1)
            this.bottomPipe.remove()
            this.topPipe.remove()
        }
        

        
        
    }
}
const bird = new Bird();
let pipeArr = [];
setInterval(() => {
    const newP = new Pipe()
    pipeArr.push(newP)
}, 3500);

setInterval(() => {
    pipeArr.forEach((pipe) => {
        pipe.moveLeft();  
        
        //collision detection
        if (
            bird.positionX < pipe.positionX + pipe.width &&
            bird.positionX + bird.width > pipe.positionX &&
            bird.positionY < pipe.topPipePositionY + pipe.height &&
            bird.positionY + bird.height > pipe.topPipePositionY
        ) {
            console.log("game over...");
        }
    })
},16)