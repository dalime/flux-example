import axios from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  getAllTodos() {
    axios.get('/api/todos')
      .then(res => res.data)
      .then(ServerActions.receiveTodos)
      .catch(console.error);
  },
  createTodo(todo) {
    axios.post('/api/todos', todo)
      .then(res => res.data)
      .then(ServerActions.receiveOneTodo)
      .catch(console.error);
  },
  deleteTodo(todoId) {
    axios.delete(`/api/todos/${todoId}`)
      .then(res => res.data)
      .then(ServerActions.deleteTodo)
      .catch(console.error);
  },
  updateTodo(todoId, updatedTodo) {
    axios.put(`/api/todos/${todoId}`, updatedTodo)
      .then(res => res.data)
      .then(ServerActions.updateTodo)
      .catch(console.error);
  }
}

export default API;
