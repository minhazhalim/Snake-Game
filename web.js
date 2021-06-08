const canvas = document.getElementById('canvas');
const zim = canvas.getContext('2d');
let state = initialState();
const x = c => Math.round(c * canvas.width / state.columns);
const y = r => Math.round(r * canvas.height / state.rows);
const draw = () => {
     zim.fillStyle = '#232323';
     zim.fillRect(0,0,canvas.width,canvas.height);
     zim.fillStyle = 'rgb(0,200,50)';
     state.snake.map(p => zim.fillRect(x(p.x),y(p.y),x(1),y(1)));
     zim.fillStyle = 'rgb(255,50,0)';
     zim.fillRect(x(state.apple.x),y(state.apple.y),x(1),y(1));
     if(state.snake.length == 0){
          zim.fillStyle = 'rgb(255,0,0)';
          zim.fillRect(0,0,canvas.width,canvas.height);
     }
};
draw();
const step = t1 => t2 => {
     if(t2 - t1 > 250){
          state = next(state);
          draw();
          window.requestAnimationFrame(step(t2));
     }else{
          window.requestAnimationFrame(step(t1));
     }
};
window.addEventListener('keydown',event => {
     switch(event.key){
          case 'w': case 'h': case 'ArrowUp': state = enqueue(state,NORTH); break;
          case 'a': case 'j': case 'ArrowLeft': state = enqueue(state,WEST);  break;
          case 's': case 'k': case 'ArrowDown': state = enqueue(state,SOUTH); break;
          case 'd': case 'l': case 'ArrowRight': state = enqueue(state,EAST);  break;
     }
});
window.requestAnimationFrame(step(0));