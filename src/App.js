import React from "react";
import "./App.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = { list: "", store: [], isChecked: false, completedTasks: [] };
  }
  addToDo = () => {
    this.setState({ store: [...this.state.store, this.state.list] });
  };
  getValue = (e) => {
    this.setState({ list: e.target.value });
  };
  deleteToDo = (index) => {
    const currentIndex = index;
    const list = this.state.store;

    const filteredArray = list.filter((_, idx) => idx !== currentIndex);
    console.log("filteredArray: ", filteredArray);

    this.setState({ store: filteredArray });
  };

  getCheckedEl = (index) => {
    let currentIndex = index;
    const list = this.state.store;
    const filteredArray = list.filter((_, idx) => idx === currentIndex);
    this.setState({ isChecked: !this.state.isChecked });
    !this.state.isChecked
      ? this.setState({
          completedTasks: [...this.state.completedTasks, filteredArray],
        })
      : this.setState({ completedTasks: this.state.completedTasks });
  };
  deleteCompleted = (index) => {
    const currentIndex = index;
    const list = this.state.completedTasks;

    const filteredArray = list.filter((_, idx) => idx !== currentIndex);
    console.log("filteredArray: ", filteredArray);

    this.setState({ completedTasks: filteredArray });
  };
  render() {
    console.log(this.state.completedTasks);
    return (
      <div className="App">
        <h1>TO DO LIST</h1>
        <input
          onChange={this.getValue}
          name="input"
          type="text"
          placeholder="what do you want to do bro?"
        />
        <button onClick={this.addToDo}>Add</button>
        <ul>
          {this.state.store.map((el, index) => {
            return (
              <div className="inline home-page__bottom " key={index}>
                <li className="todo_item">
                  {el}
                  <input
                    onChange={() => this.getCheckedEl(index)}
                    checked={this.state.isChecked}
                    type="checkbox"
                  />
                  <button onClick={() => this.deleteToDo(index)}>Delete</button>{" "}
                </li>
              </div>
            );
          })}
          <div>
            <h3>Completed tasks</h3>
            {this.state.completedTasks.map((el, index) => {
              return (
                <div className="inline">
                  <li className="linethru">{el}</li>
                  <button onClick={() => this.deleteCompleted(index)}>
                    Delete
                  </button>{" "}
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    );
  }
}

export default App;
