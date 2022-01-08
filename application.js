document.addEventListener('DOMContentLoaded',() => {
     const div = document.querySelectorAll('.grid div');
     const span = document.querySelector('span');
     const start = document.querySelector('.start');
     const width = 10;
     let currentIndex = 0;
     let appleIndex = 0;
     let currentSnake = [2,1,0];
     let direction = 1;
     let score = 0;
     let speed = 0.9;
     let interval = 0;
     let intervalTime = 0;
     function randomApple(){
          do {
               appleIndex = Math.floor(Math.random() * div.length);
          }
          while(div[appleIndex].classList.contains('snake'));
          div[appleIndex].classList.add('apple');
     }
     function startGame(){
          currentSnake.forEach(index => div[index].classList.remove('snake'));
          div[appleIndex].classList.remove('apple');
          clearInterval(interval);
          score = 0;
          randomApple();
          direction = 1;
          span.innerText = score;
          intervalTime = 1000;
          currentSnake = [2,1,0];
          currentIndex = 0;
          currentSnake.forEach(index => div[index].classList.add('snake'));
          interval = setInterval(moveOutcomes,intervalTime);
     }
     start.addEventListener('click',startGame);
     function moveOutcomes(){
          if((currentSnake[0] + width >= (width * width) && direction === width) || (currentSnake[0] % width === width -1 && direction === 1) || (currentSnake[0] % width === 0 && direction === -1) || (currentSnake[0] - width < 0 && direction === -width) || div[currentSnake[0] + direction].classList.contains('snake')){
               return clearInterval(interval);
          }
          const tail = currentSnake.pop();
          div[tail].classList.remove('snake');
          currentSnake.unshift(currentSnake[0] + direction);
          if(div[currentSnake[0]].classList.contains('apple')){
               div[currentSnake[0]].classList.remove('apple');
               div[tail].classList.add('snake');
               currentSnake.push(tail);
               randomApple();
               score++;
               span.textContent = score;
               clearInterval(interval);
               intervalTime = intervalTime * speed;
               interval = setInterval(moveOutcomes,intervalTime);
          }
          div[currentSnake[0]].classList.add('snake');
     }
     function control(event){
          div[currentIndex].classList.remove('snake');
          if(event.keyCode === 39){
               direction = 1;
          }else if(event.keyCode === 38){
               direction = -width;
          }else if(event.keyCode === 37){
               direction = -1;
          }else if(event.keyCode === 40){
               direction = +width;
          }
     }
     document.addEventListener('keyup',control);
});