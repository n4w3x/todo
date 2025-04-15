import './App.css'
import { Component } from 'react'
import PropTypes from 'prop-types'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

export default class App extends Component {
  maxId = 1

  state = {
    tasks: [
      this.createTodoItem('Completed task'),
      this.createTodoItem('Editing task'),
      this.createTodoItem('Active task'),
    ],
    filter: 'All',
  }

  componentDidMount() {
    this.timer = setInterval(this.updateRunningTimers, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }

  updateRunningTimers = () => {
    this.setState(({ tasks }) => {
      const updatedTasks = tasks.map((task) => {
        if (task.isRunning && task.lastStartTime) {
          const now = Date.now()
          const elapsed = Math.floor((now - task.lastStartTime) / 1000)
          return {
            ...task,
            currentElapsed: task.timeElapsed + elapsed,
          }
        }
        return task
      })
      return { tasks: updatedTasks }
    })
  }

  createTodoItem(text) {
    return {
      id: this.maxId++,
      description: text,
      created: new Date(),
      done: false,
      timeElapsed: 0,
      lastStartTime: null,
      isRunning: false,
      currentElapsed: 0,
    }
  }

  deleteItem = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((el) => el.id !== id),
    }))
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)
    this.setState(({ tasks }) => ({
      tasks: [...tasks, newItem],
    }))
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((el) => (el.id === id ? { ...el, done: !el.done } : el)),
    }))
  }

  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => ({
      tasks: tasks.filter((task) => !task.done),
    }))
  }

  onEditItem = (id, newDescription) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((el) => (el.id === id ? { ...el, description: newDescription } : el)),
    }))
  }

  onToggleTimer = (id) => {
    this.setState(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id !== id) return task
        if (task.isRunning) {
          const now = Date.now()
          const elapsed = Math.floor((now - task.lastStartTime) / 1000)
          return {
            ...task,
            isRunning: false,
            timeElapsed: task.timeElapsed + elapsed,
            lastStartTime: null,
            currentElapsed: task.timeElapsed + elapsed,
          }
        } else {
          return {
            ...task,
            isRunning: true,
            lastStartTime: Date.now(),
          }
        }
      }),
    }))
  }
  formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0')
    const sec = String(seconds % 60).padStart(2, '0')
    return `${min}:${sec}`
  }
  render() {
    const { tasks, filter } = this.state
    const doneCount = tasks.filter((task) => !task.done).length

    const filteredTasks = tasks.filter((task) => {
      if (filter === 'All') return true
      if (filter === 'Active') return !task.done
      if (filter === 'Completed') return task.done
      return true
    })
    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            tasks={filteredTasks}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onEditItem={this.onEditItem}
            onToggleTimer={this.onToggleTimer}
            formatTime={this.formatTime}
          />
          <Footer count={doneCount} onFilterChange={this.onFilterChange} clearCompleted={this.clearCompleted} />
        </section>
      </section>
    )
  }
}
App.defaultProps = {
  tasks: [],
  filter: 'All',
}
App.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
}
