const maxX = 700;
const maxY = 400;


class Bird {
    constructor(){
        this.width = 30
        this.height = 30
        this.positionY = 200 - this.width / 2
        this.positionX = 50
        this.speedY = 0
        this.gravity = 0.2
        this.gravitySpeed = 0
 



        this.playerElm = document.getElementById("bird")
        this.playerElm.style.width = this.width + "px"
        this.playerElm.style.height = this.height + "px"
        this.playerElm.style.bottom = this.positionY + "px"
        this.playerElm.style.left = this.positionX + "px"

        document.addEventListener("keydown",(e) => {
            if(e.code === "Space"){
                bird.moveUp();
            }
            
        });
        this.moveDown();

    }

    moveUp(){
      this.speedY -= 6;
    }
    

    moveDown(){
        this.speedY += this.gravity
        this.positionY -= this.speedY
        if(this.positionY >  maxY - this.height){
            this.positionY = maxY - this.height
            this.speedY = 0;
        }
        else if(this.positionY < 0){
            this.positionY = 0;
        }
        this.playerElm.style.bottom = this.positionY + "px"
        requestAnimationFrame(this.moveDown.bind(this))
    
}
}


const bird = new Bird();


class Pipe {
    constructor(){
        this.width = 20 ;
        this.height = 150 
        this.positionX = 700
        this.positionY = 0
        this.pipe = null
        // this.createPipeTop()
        this.createPipe();
        this.moveLeft()
    }
    createPipe(){
        this.pipe = document.createElement("div");
        this.pipe.className = "pipes";
        this.pipe.style.width = this.width + "px"
        this.pipe.style.height = this.height + "px"
        this.pipe.style.bottom = this.positionY + "px"
        this.pipe.style.left = this.positionX + "px"

        const newPipe = document.getElementById("background")
        newPipe.appendChild(this.pipe)
    }
    moveLeft(){
        this.positionX -= 2;
        this.pipe.style.left = this.positionX + "px"
        requestAnimationFrame(this.moveLeft.bind(this))
        
        
    }
}

setInterval(() => {
    const newP = new Pipe()
}, 2000);

// setInterval(() => {
//     pipeArr.forEach((element) => {
//         element.moveLeft();
//     })
// },1000)