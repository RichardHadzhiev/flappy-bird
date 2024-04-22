const maxX = 800;
const maxY = 600;


class Bird {
    constructor(){
        this.width = 30
        this.height = 30
        this.positionY = 200 - this.width / 2
        this.positionX = 50


        this.playerElm = document.getElementById("bird")
        this.playerElm.style.width = this.width + "px"
        this.playerElm.style.height = this.height + "px"
        this.playerElm.style.bottom = this.positionY + "px"
        this.playerElm.style.left = this.positionX + "px"
    }

    moveUp(){
        this.positionY++;
        this.playerElm.style.bottom = this.positionY + "px"
    }

    moveDown(){
        this.positionY--;
        this.playerElm.style.bottom = this.positionY + "px"
    }
}


const bird = new Bird();

document.addEventListener("keydown",(e) => {
    if(e.code === "Space"){
        bird.moveUp();
    }
    else{
        bird.moveDown();
    }
})