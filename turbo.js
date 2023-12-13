const board = document.getElementById('game-board');
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo');
const score = document.getElementById('score');
const highScore = document.getElementById('highScore');
const gridSize = 20;
let snake = [{x: 10,y: 10}];
let highScoreCount = 0;
let direction = 'right';
let gameSpeedDelay = 400;
let gameStarted = false;
let food = generateFood();
let gameInterval;
function createGameElement(tag,className){
     const element = document.createElement(tag);
     element.className = className;
     return element;
}
function setPosition(element,position){
     element.style.gridColumn = position.x;
     element.style.gridRow = position.y;
}
function generateFood(){
     const x = Math.floor(Math.random() * gridSize) + 1;
     const y = Math.floor(Math.random() * gridSize) + 1;
     return {x,y};
}
function increaseSpeed(){
     if(gameSpeedDelay > 150) gameSpeedDelay -= 5;
     else if(gameSpeedDelay > 100) gameSpeedDelay -= 3;
     else if(gameSpeedDelay > 50) gameSpeedDelay -= 2;
     else if(gameSpeedDelay > 25) gameSpeedDelay -= 1;
}
function updateScore(){
     const currentScore = snake.length - 1;
     score.textContent = currentScore.toString().padStart(3,'0');
}
function updatehighScore(){
     const currentScore = snake.length - 1;
     if(currentScore > highScoreCount){
          highScoreCount = currentScore;
          highScore.textContent = highScoreCount.toString().padStart(3,'0');
     }
     highScore.style.display = 'block';
}
function drawFood(){
     if(gameStarted){
          const foodElement = createGameElement('div','food');
          setPosition(foodElement,food);
          board.appendChild(foodElement);
     }
}
function drawSnake(){
     snake.forEach((segment) => {
          const snakeElement = createGameElement('div','snake');
          setPosition(snakeElement,segment);
          board.appendChild(snakeElement);
     });
}
function draw() {
     board.innerHTML = "";
     drawSnake();
     drawFood();
     updateScore();
}
function resetGame(){
     updatehighScore();
     stopGame();
     snake = [{x: 10,y: 10}];
     food = generateFood();
     direction = 'right';
     gameSpeedDelay = 200;
     updateScore();
}
function checkCollision(){
     const head = snake[0];
     if(head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) resetGame();
     for(let i = 1;i < snake.length;i++){
          if(head.x === snake[i].x && head.y === snake[i].y) resetGame();
     }
}
function move(){
     const head = {...snake[0]};
     switch(direction){
          case 'up':
               head.y--;
               break;
          case 'down':
               head.y++;
               break;
          case 'left':
               head.x--;
               break;
          case 'right':
               head.x++;
               break;
     }
     snake.unshift(head);
     if(head.x === food.x && head.y === food.y){
          food = generateFood();
          increaseSpeed();
          clearInterval(gameInterval);
          gameInterval = setInterval(() => {
               move();
               checkCollision();
               draw();
          },gameSpeedDelay);
     }else snake.pop();
}
function startGame() {
     gameStarted = true;
     instructionText.style.display = 'none';
     logo.style.display = 'none';
     gameInterval = setInterval(() => {
          move();
          checkCollision();
          draw();
     },gameSpeedDelay);
}
function stopGame() {
     clearInterval(gameInterval);
     gameStarted = false;
     instructionText.style.display = 'block';
     logo.style.display = 'block';
}
function handleKeyPress(event){
     if((!gameStarted && event.code === 'Space') || (!gameStarted && event.key === " ")) startGame();
     else{
          switch(event.key){
               case 'ArrowUp':
                    direction = 'up';
                    break;
               case 'ArrowDown':
                    direction = 'down';
                    break;
               case 'ArrowLeft':
                    direction = 'left';
                    break;
               case 'ArrowRight':
                    direction = 'right';
                    break;
          }
     }
}
document.addEventListener('keydown',handleKeyPress);