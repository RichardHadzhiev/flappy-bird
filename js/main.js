const boardWidth = 800;
const boardHeight = 600;

let bird;
let pipeArr;

let points;
let gameOver;
let startTime;

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    bird.moveUp();
  }
});
class Bird {
  constructor() {
    this.width = 32;
    this.height = 32;
    this.positionY = boardHeight / 2;
    this.positionX = boardWidth / 8;
    this.speedY = 0;
    this.gravity = 0.21;

    this.birdElm = document.getElementById("bird");
    this.birdElm.style.width = this.width + "px";
    this.birdElm.style.height = this.height + "px";
    this.birdElm.style.top = this.positionY + "px";
    this.birdElm.style.left = this.positionX + "px";

    this.moveDown();
  }

  moveUp() {
    this.speedY -= 5;
  }

  moveDown() {
    this.speedY += this.gravity;
    this.positionY += this.speedY;
    if (this.positionY > boardHeight - this.height) {
      this.positionY = boardHeight - this.height;
      this.speedY = 0;
    } else if (this.positionY < 0) {
      this.positionY = 0;
      this.speedY = 0;
    }
    this.birdElm.style.top = this.positionY + "px";
    requestAnimationFrame(this.moveDown.bind(this));
  }
}

class Pipe {
  constructor() {
    this.width = 30;
    this.height = 400;
    this.gap = boardHeight / 5; // gap between pipes
    this.positionX = boardWidth;
    this.positionYtopPipe =
      0 - this.height / 4 - Math.random() * (this.height / 2);
    this.positionYbottomPipe = this.positionYtopPipe + this.height + this.gap;
    this.topPipe = null;
    this.bottomPipe = null;
    this.createPipe();
    this.moveLeft();
  }
  createPipe() {
    //top pipe
    this.topPipe = document.createElement("div");
    this.topPipe.className = "pipeTop";
    this.topPipe.style.width = this.width + "px";
    this.topPipe.style.height = this.height + "px";
    this.topPipe.style.top = this.positionYtopPipe + "px";
    this.topPipe.style.left = this.positionX + "px";
    //bottom pipe
    this.bottomPipe = document.createElement("div");
    this.bottomPipe.className = "pipes";
    this.bottomPipe.style.width = this.width + "px";
    this.bottomPipe.style.height = this.height + "px";
    this.bottomPipe.style.top = this.positionYbottomPipe + "px";
    this.bottomPipe.style.left = this.positionX + "px";

    const newPipe = document.getElementById("background");
    newPipe.appendChild(this.topPipe);
    newPipe.appendChild(this.bottomPipe);
  }
  moveLeft() {
    this.positionX -= 0.8;
    this.bottomPipe.style.left = this.positionX + "px";
    this.topPipe.style.left = this.positionX + "px";
    if (this.positionX < -50) {
      pipeArr.splice(0, 1);
      this.bottomPipe.remove();
      this.topPipe.remove();
    }
    //difficulty increase
    if (points > 15 || points < 2) {
      this.positionX -= 0.2;
    } else if (points > 2 && points < 15) {
      this.positionX -= 0.1;
    } else if (points > 40) {
      this.positionX -= 0.3;
    }
  }
}

// add event listner for "start game" btn
const btn = document.getElementById("btn");
btn.addEventListener("click", () => {
  startGame();
});
let gameLoop;
let creatingPipes;
welcomeScreen();

function welcomeScreen() {
  document.getElementById("welcome").style.display = "flex";
  document.getElementById("background").style.display = "none";
  document.getElementById("endGame").style.display = "none";
}

function startGame() {
  document.getElementById("welcome").style.display = "none";
  document.getElementById("background").style.display = "flex";
  document.getElementById("endGame").style.display = "none";

  bird = new Bird();
  pipeArr = [];

  creatingPipes = setInterval(() => {
    const newP = new Pipe();
    pipeArr.push(newP);
  }, 1300);

  points = 0;
  gameOver = false;
  startTime = Date.now();

  gameLoop = setInterval(() => {
    if (!gameOver) {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      points = elapsedTime; //for every second survived you get 1 point
    }
    //collision detenction
    pipeArr.forEach((pipe) => {
      pipe.moveLeft();
      if (
        (bird.positionX < pipe.positionX + pipe.width &&
          bird.positionX + bird.width > pipe.positionX &&
          bird.positionY < pipe.positionYtopPipe + pipe.height &&
          bird.positionY + bird.height > pipe.positionYtopPipe) ||
        (bird.positionX < pipe.positionX + pipe.width &&
          bird.positionX + bird.width > pipe.positionX &&
          bird.positionY < pipe.positionYbottomPipe + pipe.height &&
          bird.positionY + bird.height > pipe.positionYbottomPipe)
      ) {
        gameOver = true;
        clearInterval(gameLoop);
        clearInterval(creatingPipes);
        endGame(points); //points
        points = 0;
      }
    }, 22);
  });
}

let resetBtn = document.getElementById("playAgain");
resetBtn.addEventListener("click", () => {
  points = 0;
  gameOver = false;
  startTime = Date.now();

  clearInterval(gameLoop);
  clearInterval(creatingPipes);

  // clear pipes
  pipeArr.forEach((pipe) => {
    pipe.bottomPipe.remove();
    pipe.topPipe.remove();
  });
  pipeArr.length = 0;

  welcomeScreen();
});

function endGame(points) {
  document.getElementById("background").style.display = "none";
  document.getElementById("endGame").style.display = "flex";
  document.getElementById("result").textContent =
    "Dear User,You have scored " + points + " " + "Points";
  clearInterval(gameLoop);
  clearInterval(creatingPipes);
  points = 0;
}
