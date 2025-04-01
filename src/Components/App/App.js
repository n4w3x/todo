import NewTaskForm from "../NewTaskForm";
import TaskList from "../TaskList";
import Footer from "../Footer";
import "./App.css";
import { Component } from "react";
import PropTypes from "prop-types";

export default class App extends Component {
  maxId = 1;

  state = {
    tasks: [
      this.createTodoItem("Completed task"),
      this.createTodoItem("Editing task"),
      this.createTodoItem("Active task"),
    ],
    filter: "All",
  };

  createTodoItem(text) {
    return {
      id: this.maxId++,
      description: text,
      created: new Date(),
      done: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);

      const newArray = [...tasks.slice(0, idx), ...tasks.slice(idx + 1)];

      return {
        tasks: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ tasks }) => {
      const newArr = [...tasks, newItem];
      return {
        tasks: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      const newItem = { ...oldItem, done: !oldItem.done };
      const newArray = [
        ...tasks.slice(0, idx),
        newItem,
        ...tasks.slice(idx + 1),
      ];

      return {
        tasks: newArray,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const filteredTasks = tasks.filter((task) => !task.done);
      return {
        tasks: filteredTasks,
      };
    });
  };

  onEditItem = (id, newDescription) => {
    this.setState(({ tasks }) => {
      const idx = tasks.findIndex((el) => el.id === id);
      const oldItem = tasks[idx];
      const newItem = { ...oldItem, description: newDescription };

      const newArray = [
        ...tasks.slice(0, idx),
        newItem,
        ...tasks.slice(idx + 1),
      ];

      return {
        tasks: newArray,
      };
    });
  };

  render() {
    const { tasks, filter } = this.state;
    const doneCount = tasks.filter((task) => !task.done).length;

    const filteredTasks = tasks.filter((task) => {
      if (filter === "All") return true;
      if (filter === "Active") return !task.done;
      if (filter === "Completed") return task.done;
      return true;
    });

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditItem={this.onEditItem}
          />
          <Footer
            count={doneCount}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}

App.defaultProps = {
  tasks: [],
  filter: "All",
};

App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
};
