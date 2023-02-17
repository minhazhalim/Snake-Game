const playBoard = document.querySelector('.play-board');
const score = document.querySelector('.score');
const highScore = document.querySelector('.high-score');
const controls = document.querySelectorAll('.controls i');
let gameOver = false;
let snakeX = 5;
let snakeY = 5;
let velocityX = 0;
let velocityY = 0;
let scoreCount = 0;
let snakeBody = [];
let foodX;
let foodY;
let setIntervalId;
let storage = localStorage.getItem('high-score') || 0;
score.innerText = `High Score: ${storage}`;
const updateFoodPosition = () => {
     foodX = Math.floor(Math.random() * 30) + 1;
     foodY = Math.floor(Math.random() * 30) + 1;
};
updateFoodPosition();
const handleGameOver = () => {
     clearInterval(setIntervalId);
     alert('Game Over! Press Ok to Replay.....');
     location.reload();
};
const changeDirection = event => {
     if(event.key === 'ArrowUp' && velocityY != 1){
          velocityX = 0;
          velocityY = -1;
     }else if(event.key === 'ArrowDown' && velocityY != -1){
          velocityX = 0;
          velocityY = 1;
     }else if(event.key === 'ArrowLeft' && velocityX != 1){
          velocityX = -1;
          velocityY = 0;
     }else if(event.key === 'ArrowRight' && velocityX != -1){
          velocityX = 1;
          velocityY = 0;
     }
};
controls.forEach(button => button.addEventListener('click',() => changeDirection({key: button.dataset.key})));
document.addEventListener('keyup',changeDirection);
const initGame = () => {
     if(gameOver) return handleGameOver();
     let html = `<div class='food' style='grid-area: ${foodY} / ${foodX}'></div>`;
     if(snakeX === foodX && snakeY === foodY){
          updateFoodPosition();
          snakeBody.push([foodY,foodX]);
          scoreCount++;
          storage = scoreCount >= storage ? scoreCount : storage;
          localStorage.setItem('high-score',storage);
          score.innerText = `Score: ${scoreCount}`;
          highScore.innerText = `High Score: ${storage}`;
     }
     snakeX += velocityX;
     snakeY += velocityY;
     for(let i = snakeBody.length - 1;i > 0;i--){
          snakeBody[i] = snakeBody[i - 1];
     }
     snakeBody[0] = [snakeX,snakeY];
     if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) return gameOver = true;
     for(let i = 0;i < snakeBody.length;i++){
          html += `<div class='head' style='grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}'></div>`;
          if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) gameOver = true;
     }
     playBoard.innerHTML = html;
};
setIntervalId = setInterval(initGame,300);