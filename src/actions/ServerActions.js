import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveTodos(todos) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_TODOS',
      todos
    })
  },
  receiveOneTodo(todo) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ONE_TODO',
      todo
    })
  },
  deleteTodo(id) {
    AppDispatcher.dispatch({
      type: 'DELETE_TODO',
      id
    })
  },
  updateTodo(todos) {
    AppDispatcher.dispatch({
      type: 'UPDATE_TODO',
      todos
    })
  }
}

export default ServerActions
