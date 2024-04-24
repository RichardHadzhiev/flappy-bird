const boardWidth = 800;
const boardHeight = 600;

class Bird {
    constructor(){
        this.width = 32
        this.height = 32
        this.positionY = boardHeight / 2
        this.positionX = boardWidth/8
        this.speedY = 0
        this.gravity = 0.21
 



        this.birdElm = document.getElementById("bird")
        this.birdElm.style.width = this.width + "px"
        this.birdElm.style.height = this.height + "px"
        this.birdElm.style.top = this.positionY + "px"
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
        this.positionY += this.speedY
        if(this.positionY >  boardHeight - this.height){
            this.positionY = boardHeight - this.height
            this.speedY = 0;   
        }
        else if(this.positionY < 0){
            this.positionY = 0;
            this.speedY = 0
        }
        this.birdElm.style.top = this.positionY + "px"
        requestAnimationFrame(this.moveDown.bind(this))
    
}
}




class Pipe {
    constructor(){
        this.width = 30 ;
        this.height = 330;
        this.gap = boardHeight / 4 // gap between pipes
        this.positionX = boardWidth
        this.positionYtopPipe = 0 - this.height/4 - Math.random() * (this.height/4); // -82 .... -245
        this.positionYbottomPipe = this.positionYtopPipe + this.height + this.gap;
        this.topPipe = null;
        this.bottomPipe = null;
        this.createPipe();
        this.moveLeft()
    }
    createPipe(){
        
        //top pipe
        this.topPipe = document.createElement("div");
        this.topPipe.className = "pipeTop";
        this.topPipe.style.width = this.width + "px";
        this.topPipe.style.height = this.height + "px"   
        this.topPipe.style.top = this.positionYtopPipe  + "px"    
        this.topPipe.style.left = this.positionX + "px"
        //bottom pipe
        this.bottomPipe = document.createElement("div");
        this.bottomPipe.className = "pipes";
        this.bottomPipe.style.width = this.width + "px"
        this.bottomPipe.style.height = this.height + "px" 
        this.bottomPipe.style.top = this.positionYbottomPipe + "px"; // 398 ... 235
        this.bottomPipe.style.left = this.positionX + "px"

        const newPipe = document.getElementById("background")
        newPipe.appendChild(this.topPipe)
        newPipe.appendChild(this.bottomPipe)
        
    }
    moveLeft(){
        this.positionX -= 0.6;
        this.bottomPipe.style.left = this.positionX + "px"
        this.topPipe.style.left = this.positionX + "px"
        if(this.positionX < -50 ){
            pipeArr.splice(0,1)
            this.bottomPipe.remove()
            this.topPipe.remove()
        }
        

        
        
    }
}
const bird = new Bird();
const pipeArr = [];

setInterval(() => {
    const newP = new Pipe()
    pipeArr.push(newP)
}, 2000);
let passed = false;
setInterval(() => {
    pipeArr.forEach((pipe) => {
        pipe.moveLeft();
        if(
            bird.positionX < pipe.positionX + pipe.width &&
            bird.positionX + bird.width > pipe.positionX &&
            bird.positionY < pipe.positionYtopPipe + pipe.height &&
            bird.positionY + bird.height > pipe.positionYtopPipe &&
            bird.positionX < pipe.positionX + pipe.width &&
            bird.positionX + bird.width > pipe.positionX &&
            bird.positionY < pipe.positionYbottomPipe + pipe.height &&
            bird.positionY + bird.height > pipe.positionYbottomPipe
        ){
            passed = true;
        }
        
        
},4000)})