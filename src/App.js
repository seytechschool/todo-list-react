import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      inputVal: "",
      tasks: [],
      complete: [],
      ids: [],
    };
  }
  completeTodo = (event) => {
    const id = event.target.parentElement.id;
    console.log(id, "id");
    const tasks = [...this.state.tasks];
    tasks.forEach((el) => {
      if (el.id == id) {
        el.isDone = !el.isDone;
      }
    });
    this.setState({ tasks: tasks });
    ////////////////////////////////////
    let completed = [];
    this.state.tasks.filter((el) => {
      if (el.isDone === true) {
        completed.push({ name: el.name, isDone: el.isDone, id: el.id });
      }
    });

    this.setState({ complete: [...completed] });
    ////////////////////////
  };
  getValue = (e) => {
    this.setState({ inputVal: e.target.value });
  };
  addToDo = () => {
    const newTodo = {
      name: this.state.inputVal,
      id: Math.floor(Math.random() * 1000),
      isDone: false,
    };
    const list = [...this.state.tasks, newTodo];
    this.setState({ tasks: list });
  };
  delete = (e) => {
    let { tasks } = this.state;
    let i = tasks.findIndex((task) => task.id === e.target.parentElement.id);
    tasks.splice(i, 1);
    this.setState({
      tasks: tasks,
    });
  };

  deleteCompleted = (e) => {
    // let { complete } = this.state;
    // let trueIsDone = complete.filter((el) => el.isDone === true);
    // let i = complete.findIndex((task) => trueIsDone === trueIsDone);
    // console.log(i, "i");
    // complete.splice(i, 1);
    // this.setState({
    //   complete: complete,
    // });
    let ids = [];
    this.state.complete.filter((el) => ids.push(el.id));
    this.setState({ ids: ids });
    ///////////////////////////////////
    let currentID = e.currentTarget.parentElement.id;
    console.log(currentID, "current id");
    let foundIndex = this.state.ids.findIndex((el) => el === currentID); //we need clicked els value/index.indexOf(currentID);
    console.log(foundIndex, "foundindex");
    let deleted = this.state.complete.splice(foundIndex, 1);
    console.log(deleted, "delted");
    this.setState({ completed: deleted });
    // let currentID = e.target.parentElement.id;
    // console.log(currentID);
    // let filteredArr = this.state.complete.filter((el) => {
    //   if (el.id !== currentID) {
    //     this.state.complete[el].splice(0, 1);
    //   }
    // });
    // this.setState({ completed: filteredArr });
  };

  render() {
    console.log(this.state.complete, "complete");
    console.log(this.state.ids, "complete");
    return (
      <div className="App">
        <h1>TO DO LIST</h1>
        <input
          className="inputtext"
          onChange={this.getValue}
          name="input"
          type="text"
          placeholder="what do you want to do bro?"
        />
        <Button
          className="addBtn"
          onClick={this.addToDo}
          color="success"
          outline
        >
          Add
        </Button>
        <ul>
          {this.state.tasks
            .filter((el) => el.isDone === false)
            .map((el, index) => {
              return (
                <li
                  className={el.isDone ? "line-thru" : null}
                  key={el.id}
                  id={el.id}
                >
                  {!el.isDone ? el.name : null}
                  <input
                    className="checkbox"
                    onChange={this.completeTodo}
                    checked={el.isDone}
                    type="checkbox"
                  />
                  <Button color="danger" onClick={(e) => this.delete(e)}>
                    Delete
                  </Button>{" "}
                </li>
              );
            })}
        </ul>
        {/* <div className="wrapperFordone">
          <h3>Completed tasks</h3>
          {this.state.tasks
            .filter((el) => el.isDone === true)
            .map((el, index) => {
              return (
                <div key={index} className="inline">
                  <li className="linethru">{el.name}</li>
                  <button onClick={(e) => this.deleteCompleted(e)}>
                    Delete
                  </button>{" "}
                </div>
              );
            })}
        </div> */}
        <div className="wrapperFordone">
          <h3>COMPLETED TASKS</h3>
          {this.state.complete.map((el, index) => {
            return (
              <li id={el.id} className="linethru">
                {el.name}
                <Button color="danger" onClick={(e) => this.deleteCompleted(e)}>
                  Delete
                </Button>{" "}
              </li>
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
