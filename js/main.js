welcomeScreen()
function welcomeScreen(){
    const welcome = document.getElementById("welcome")
    const btn = document.getElementById("btn")
    document.getElementById("background").style.display = "none";
    btn.addEventListener("click",() => {
        startGame()
    })
}



function startGame(){
    document.getElementById("welcome").style.display = "none"
    document.getElementById("background").style.display = "flex"
    
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
            this.height = 400;
            this.gap = boardHeight / 5 // gap between pipes
            this.positionX = boardWidth
            this.positionYtopPipe = 0 - this.height/4 - Math.random() * (this.height/2); // -82 .... -245
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
            this.positionX -= 0.8;
            this.bottomPipe.style.left = this.positionX + "px"
            this.topPipe.style.left = this.positionX + "px"
            if(this.positionX < -50 ){
                pipeArr.splice(0,1)
                this.bottomPipe.remove()
                this.topPipe.remove()
            }
            if(points > 15 || points < 3){
                this.positionX -= 0.3
                
            }
            
    
            
            
        }
    }
    const bird = new Bird();
    const pipeArr = [];
    
    const creatingPipes = setInterval(() => {
        const newP = new Pipe()
        pipeArr.push(newP)
    }, 1300);
    
    
    let points = 0;
    let gameOver = false;
    let startTime = Date.now()
    
    
    const gameLoop = setInterval(() => {
        if(!gameOver){
    
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
            points = elapsedTime //for every second survived you get 1 point
            console.log(points)
        }
    
    
        pipeArr.forEach((pipe) => {
            pipe.moveLeft();
            let passed = true;
            if(
                (bird.positionX < pipe.positionX + pipe.width &&
                bird.positionX + bird.width > pipe.positionX &&
                bird.positionY < pipe.positionYtopPipe + pipe.height &&
                bird.positionY + bird.height > pipe.positionYtopPipe) ||
                (bird.positionX < pipe.positionX + pipe.width &&
                bird.positionX + bird.width > pipe.positionX &&
                bird.positionY < pipe.positionYbottomPipe + pipe.height &&
                bird.positionY + bird.height > pipe.positionYbottomPipe)
            ){
                gameOver = true;
                console.log("over")
                clearInterval(gameLoop)
                clearInterval(creatingPipes)
                alert("Game Over! Your score is: " + points )
                
            }
    },22)})

}
// startGame();