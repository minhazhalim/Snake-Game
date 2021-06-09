const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
const musicSound = new Audio('music/music.mp3');
let inputDir = {x: 0,y: 0};
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [{x: 13,y: 15}];
food = {x: 6, y: 7};
function main(currentTime){
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime) / 1000 < 1 / speed) return;
    lastPaintTime = currentTime;
    gameEngine();
}
function isCollide(snake){ 
    for(let i = 1;i < snakeArray.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
    return false;
}
function gameEngine(){
    if(isCollide(snakeArray)){
        gameOverSound.play();
        musicSound.pause();
        inputDir =  {x: 0,y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArray = [{x: 13,y: 15}];
        musicSound.play();
        score = 0; 
    }
    if(snakeArray[0].y === food.y && snakeArray[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiScoreValue){
            hiScoreValue = score;
            localStorage.setItem("HiScore",JSON.stringify(hiScoreValue));
            hiScoreBox.innerHTML = "HiScore: " + hiScoreValue;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArray.unshift({x: snakeArray[0].x + inputDir.x,y: snakeArray[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b - a) * Math.random()),y: Math.round(a + (b - a) * Math.random())}
    }
    for(let i = snakeArray.length - 2;i >= 0;i--){ 
        snakeArray[i + 1] = {...snakeArray[i]};
    }
    snakeArray[0].x += inputDir.x;
    snakeArray[0].y += inputDir.y;
    board.innerHTML = "";
    snakeArray.forEach((event,index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = event.y;
        snakeElement.style.gridColumnStart = event.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
musicSound.play();
let hiScore = localStorage.getItem("hiScore");
if(hiScore === null){
    hiScoreValue = 0;
    localStorage.setItem("hiScore",JSON.stringify(hiScoreValue));
}
else{
    hiScoreValue = JSON.parse(hiScore);
    hiScoreBox.innerHTML = "HiScore: " + hiScore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',event => {
    inputDir = {x: 0,y: 1};
    moveSound.play();
    switch(event.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});