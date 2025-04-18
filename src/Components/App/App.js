import React, { useState, useEffect } from 'react'

import TaskList from '../TaskList/TaskList'
import NewTaskForm from '../NewTaskForm/NewTaskForm'
import Footer from '../Footer/Footer'
import './App.css'
import data from '../Data/Data'

function App() {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('All')
  useEffect(() => {
    setTasks(data)
  }, [])

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
  }

  const handleToggleTaskState = (id, mode) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, modeEdit: mode === '' ? 'completed' : '' }
        }
        return task
      })
    )
  }

  const handleAddTask = (title, minutes, seconds) => {
    const newTask = {
      description: title,
      modeEdit: '',
      created: Date.now(),
      id: Math.floor(Math.random() * 100000),
      valueSec: Number(seconds) + Number(minutes) * 60,
      play: true,
    }

    setTasks((prevTasks) => [...prevTasks, newTask])
  }

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter)
  }

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.modeEdit !== 'completed'))
  }

  const handleEditTask = (id) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, modeEdit: 'editing' } : task)))
  }

  const handleTogglePlay = (id, isPlaying) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, play: isPlaying } : task)))
  }

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'Completed') return task.modeEdit === 'completed'
    if (filter === 'Active') return task.modeEdit !== 'completed'
    return true
  })

  const handleChangeTitle = (des, id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, description: des }
        }
        return task
      })
    )
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onAddTask={handleAddTask} />
      </header>
      <section className="main">
        <ul className="todo-list">
          <TaskList
            tasks={visibleTasks}
            onDelete={handleDeleteTask}
            onToggleEditMode={handleToggleTaskState}
            onEditTask={handleEditTask}
            onTogglePlay={handleTogglePlay}
            changeTitle={handleChangeTitle}
          />
        </ul>
        <Footer onFilterChange={handleFilterChange} onClearCompleted={handleClearCompleted} />
      </section>
    </section>
  )
}

export default App
