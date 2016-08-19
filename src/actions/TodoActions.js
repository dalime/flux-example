import API from '../API'

const TodoActions = {
  getAllTodos: API.getAllTodos,
  createTodo(todo) {
    API.createTodo(todo);
  },
  deleteTodo(id) {
    API.deleteTodo(id);
  },
  updateTodo(id, updatedTodo) {
    API.updateTodo(id, updatedTodo);
  }
}

export default TodoActions
