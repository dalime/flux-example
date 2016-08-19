import React, { Component } from 'react';
import moment from 'moment';
import TodoActions from '../actions/TodoActions';

export default class ListItem extends Component {
  constructor() {
    super();

    this.state = {
      isComplete: false
    }

    this.delete = this.delete.bind(this);
    this.open = this.open.bind(this);
    this.changeComplete = this.changeComplete.bind(this);
  }

  delete(e) {
    e.preventDefault();
    TodoActions.deleteTodo(this.props._id);
  }

  open(e) {
    e.preventDefault();
    this.props.openModal(this.props._id)
  }

  changeComplete(e) {
    if (!this.state.isComplete) {
      this.setState({isComplete: true});
    } else {
      this.setState({isComplete: false});
    }
    this.props.updateComplete(this.props._id, this.props.task, !this.state.isComplete);
  }

  componentDidMount() {
    let { _id, task, createdAt, isComplete } = this.props;
    this.setState({isComplete: isComplete});
  }

  render() {
    let { _id, task, createdAt, isComplete } = this.props;
    return (
      <tr>
        <td>{ task }</td>
        <td>{ moment(createdAt).format('lll') }</td>
        <td>
          <input type="checkbox" checked={this.state.isComplete} onChange={this.changeComplete}/>
        </td>
        <td>
          <button className="btn btn-danger btn-xs" onClick={this.delete}>Delete</button>
        </td>
        <td>
          <button className="btn btn-success btn-xs" onClick={this.open}>Update</button>
        </td>
      </tr>
    )
  }
}
