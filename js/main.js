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
    constructor(maxY){
        this.width = 20 ;
        this.height = 62;
        // this.minHeight = 50; // 62
        // this.maxHeight = 200
        this.minGap = 80 // gap between pipes
        this.maxGap = 80
        this.positionX = 700
        this.bottomPipePositionY = 0;
        this.bottomPipe = null;
        this.topPipe = null;
        this.maxY = maxY
        this.createPipe();
        this.moveLeft()
    }
    createPipe(){
        const gap = Math.floor(Math.random() * (this.maxGap - this.minGap + 1)) + this.minGap
        console.log(gap)
        const bottomPipePositionY = Math.floor(Math.random() * (this.maxY - gap))
        console.log(bottomPipePositionY)
        const topPipePositionY = maxY - bottomPipePositionY - gap
        console.log(topPipePositionY)

        // const bottomHeight = Math.floor(Math.random() * (this.maxHeight - this.minHeight + 1) + this.minHeight)
        // const topHeight = maxY - bottomHeight- gap


        //bottom pipe
        this.bottomPipe = document.createElement("div");
        this.bottomPipe.className = "pipes";
        this.bottomPipe.style.width = this.width + "px"
        this.bottomPipe.style.height =bottomPipePositionY + "px"  //bottomHeight
        this.bottomPipe.style.bottom = 0 + "px" // .this
        this.bottomPipe.style.left = this.positionX + "px"

        setInterval(() => {
            this.bottomPipe.remove()
            
        }, 7000);

        //top pipe
        this.topPipe = document.createElement("div");
        this.topPipe.className = "pipeTop";
        this.topPipe.style.width = this.width + "px";
        this.topPipe.style.height =topPipePositionY + "px"; //topHeight
        this.topPipe.style.top = 0 + "px"
        this.topPipe.style.left = this.positionX + "px"

        setInterval(() => {
            this.topPipe.remove()
        }, 7000);


        const newPipe = document.getElementById("background")
        newPipe.appendChild(this.bottomPipe)
        newPipe.appendChild(this.topPipe)

    }
    moveLeft(){
        this.positionX -= 2;
        this.bottomPipe.style.left = this.positionX + "px"
        this.topPipe.style.left = this.positionX + "px"
        requestAnimationFrame(this.moveLeft.bind(this))
        
        
    }
}
// let pipeArr = []
setInterval(() => {
    const newP = new Pipe(maxY)
    // pipeArr.push(newP)
}, 2000);

// setInterval(() => {
//     pipeArr.forEach((element) => {
//         element.moveLeft();
//     })
// },1000/60)