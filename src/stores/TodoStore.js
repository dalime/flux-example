import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import uuid from 'uuid';

let _todos = [];

class TodoStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'RECEIVE_TODOS':
          _todos = action.todos;
          this.emit('CHANGE');
          break;
        case 'RECEIVE_ONE_TODO':
          var { todo } = action;
          _todos.push(todo);
          this.emit('CHANGE');
          break;
        case 'CREATE_TODO':
          console.log(action);
          var { todo } = action;

          todo._id = uuid();
          todo.createdAt = Date.now();
          todo.isComplete = false;

          _todos.push(todo);
          this.emit('CHANGE');
          break;
        case 'DELETE_TODO':
          var { id } = action;
          let index;
          for (let i = 0; i < _todos.length; i++) {
            if (_todos[i]._id === id) {
              index = i;
            }
          }
          _todos.splice(index, 1);
          this.emit('CHANGE');
          break;
        case 'UPDATE_TODO':
          var { todos } = action;
          _todos = todos;
          this.emit('CHANGE');
          break;
      }
    });
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAll() {
    return _todos;
  }
}

export default new TodoStore();
