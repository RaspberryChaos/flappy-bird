const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;
let gameOver = false;

const replayBtn = document.getElementById("replay");
replayBtn.addEventListener("click", () => {
    console.log("clicked");
    restart();
    replayBtn.classList.add("hidden");

})

function restart() {
    spacePressed = false;
    angle = 0;
    hue = 0;
    frame = 0;
    score = 0;
    gameSpeed = 2;
    gameOver = false;
    bird = new Bird();
    particlesArray = [];
    obstaclesArray = [];
    animate();
}

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4','#fff');
gradient.addColorStop('0.5','#000');
gradient.addColorStop('0.55','#4040ff');
gradient.addColorStop('0.6','#000');
gradient.addColorStop('0.9','#fff');

const background = new Image();
background.src = "bg.png";

const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

function handleBackground() {
    if(BG.x1 <= -BG.width + gameSpeed) {
        BG.x1 = BG.width;
    } else {
     BG.x1 -= gameSpeed;
    };

    if(BG.x2 <= -BG.width + gameSpeed) {
        BG.x2 = BG.width;
    } else {
     BG.x2 -= gameSpeed;
    };    
    
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function handleGameOver() {
    gameOver = true;
    replayBtn.classList.remove("hidden");

}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    handleObstacles();
    bird.update();
    bird.draw();
    ctx.fillStyle = gradient;
    ctx.font = "90px Georgia";
    ctx.strokeText(score, 450, 70);
    ctx.fillText(score, 450, 70);
    handleCollisions();
    if(handleCollisions()) {
        handleGameOver();
    }
    handleParticles();
    if(!gameOver) requestAnimationFrame(animate);
    angle+=0.12;
    hue++;
    frame++;
}

animate();

window.addEventListener("keydown", function(e) {
    if(e.code === "Space") spacePressed = true;
});

window.addEventListener("keyup", function(e) {
    if(e.code === "Space") spacePressed = false;
    bird.frameX = 0;
});

const bang = new Image();
bang.src = 'bang.png';

function handleCollisions() {
    for(let i = 0; i < obstaclesArray.length; i++) {
        if(bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
            (bird.y > canvas.height - obstaclesArray[i].bottom && bird.y + bird.height < canvas.height))
            ) {
                // collision detected
                ctx.drawImage(bang, bird.x, bird.y, 50, 50);
                ctx.font = "25px Georgia";
                ctx.fillStyle = "white";
                ctx.fillText(`Game Over, your score is ${score}`, 160, canvas.height/2 -10);
                return true;
            }
    }
}

