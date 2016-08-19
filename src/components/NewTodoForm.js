import React, { Component } from 'react'
import TodoActions from '../actions/TodoActions'

export default class NewTodoForm extends Component {
  constructor() {
    super();

    this.state = {
      task: ''
    }
    this.changeTaskInput = this.changeTaskInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeTaskInput(e) {
    let task = e.target.value;
    this.setState({ task })
  }

  submit(e) {
    e.preventDefault();
    let { task } = this.state;

    TodoActions.createTodo({ task });
    this.setState({task: ''});
  }

  render() {
    let { task } = this.state;

    return (
      <div>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label>Enter New Task:</label>
            <input type="text"
                   className="form-control"
                   placeholder="Buy Groceries"
                   value={task}
                   onChange={this.changeTaskInput}/>
          </div>

          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
}
