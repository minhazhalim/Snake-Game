const readLine = require('readLine');
const Snake = require('./development');
const base = require('./base');
Object.getOwnPropertyNames(base).map(p => global[p] = base[p]);
let State = Snake.initialState();
const Matrix = {
     make:      table => rep(rep('.')(table.columns))(table.rows),
     set:       val   => pos => adjust(pos.y)(adjust(pos.x)(k(val))),
     addSnake:  state => pipe(...map(Matrix.set('X'))(state.snake)),
     addApple:  state => Matrix.set('o')(state.apple),
     addCrash:  state => state.snake.length == 0 ? map(map(k('#'))) : id,
     toString:  xsxs  => xsxs.map(xs => xs.join(' ')).join('\r\n'),
     fromState: state => pipe(
     Matrix.make,
     Matrix.addSnake(state),
     Matrix.addApple(state),
     Matrix.addCrash(state)
     )(state)
};
readLine.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress',(string,key) => {
     if(key.ctrl && key.name === 'c') process.exit();
     switch(key.name.toUpperCase()){
          case 'W': case 'K': case 'UP': State = Snake.enqueue(State,Snake.NORTH); break;
          case 'A': case 'H': case 'LEFT': State = Snake.enqueue(State,Snake.WEST); break;
          case 'S': case 'J': case 'DOWN': State = Snake.enqueue(State,Snake.SOUTH); break;
          case 'D': case 'L': case 'RIGHT': State = Snake.enqueue(State,Snake.EAST); break;
     }
});
const show = () => console.log('\x1Bc' + Matrix.toString(Matrix.fromState(State)));
const step = () => State = Snake.next(State);
setInterval(() => {step();show();},80);