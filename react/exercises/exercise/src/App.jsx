import React, { Component } from "react";

class Number extends Component {
  render() {
    return <h3>{this.props.number}</h3>;
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      inputVal: "",
      editingIndex: -1, // -1 indicates no item is being edited initially
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      inputVal: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((prevState) => ({
      todos: prevState.todos.concat(prevState.inputVal),
      inputVal: "",
    }));
  }

  delete(index) {
    this.setState((prevState) => {
      const newArray = prevState.todos.slice();
      newArray.splice(index, 1);
      return { todos: newArray };
    });
  }

  edit(index) {
    this.setState({ editingIndex: index });
  }

  handleChange(e) {
    this.setState({ inputVal: e.target.value });
  }

  handleResubmit(index) {
    this.setState((prevState) => {
      const newTodos = [...prevState.todos];
      newTodos[index] = prevState.inputVal;
      return { todos: newTodos, editingIndex: -1, inputVal: "" };
    });
  }

  render() {
    return (
      <section>
        <Number number={this.state.todos.length} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        <ul>
          {this.state.todos.map((todo, index) => (
            <li key={index}>
              {this.state.editingIndex === index ? (
                <input
                  type="text"
                  value={this.state.inputVal}
                  onChange={this.handleChange}
                />
              ) : (
                <span>{todo}</span>
              )}
              <button onClick={() => this.delete(index)}>Delete</button>
              {this.state.editingIndex === index ? (
                <button onClick={() => this.handleResubmit(index)}>
                  Resubmit
                </button>
              ) : (
                <button onClick={() => this.edit(index)}>Edit</button>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
