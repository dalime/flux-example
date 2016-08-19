import React, { Component } from 'react'
import ListItem from './ListItem'
import TodoStore from '../stores/TodoStore'
import TodoActions from '../actions/TodoActions';
import { Modal, Button } from 'react-bootstrap';

export default class TodoList extends Component {
  constructor() {
    super();

    this.state = {
      todos: TodoStore.getAll(),
      showModal: false,
      text: "",
      updateId: ""
    }

    this._onChange = this._onChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.updateComplete = this.updateComplete.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    TodoActions.getAllTodos();
    TodoStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    TodoStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      todos: TodoStore.getAll()
    });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  openModal(id) {
    this.setState({ showModal: true, updateId: id });
  }

  onInputChange(e) {
    e.preventDefault();
    this.setState({text: e.target.value});
  }

  update() {
    let updatedTodo = {task: this.state.text};
    console.log ('this.state.updateId:', this.state.updateId);
    TodoActions.updateTodo(this.state.updateId, updatedTodo);
    this.setState({ showModal: false });
  }

  updateComplete(updateId, taskText, status) {
    let updatedTodo = {task: taskText, isComplete: status};
    TodoActions.updateTodo(updateId, updatedTodo);
  }

  render() {
    const ListItems = this.state.todos.map(todo => {
      return (
        <ListItem key={todo._id} {...todo} openModal={this.openModal} updateComplete={this.updateComplete}/>
      )
    })

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Created At</th>
              <th>Is Complete</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {ListItems}
          </tbody>
        </table>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input type="text" onChange={this.onInputChange}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.update}>Update</Button>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
