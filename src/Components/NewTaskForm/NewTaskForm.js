import React, { useState } from 'react'
import PropTypes from 'prop-types'

function NewTaskForm({ onAddTask = () => {} }) {
  const [dataTask, setDataTask] = useState({
    taskTitle: '',
    Min: '',
    Sec: '',
  })

  const handleTaskChange = (e) => {
    const { value, name } = e.target
    setDataTask((arr) => {
      return { ...arr, [name]: value }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { taskTitle, Min, Sec } = dataTask
    if (!taskTitle || taskTitle === ' ') {
      return
    }
    onAddTask(taskTitle, Min, Sec)
    setDataTask({
      taskTitle: '',
      Min: '',
      Sec: '',
    })
  }

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      {['taskTitle', 'Min', 'Sec'].map((elem) => (
        <input
          key={elem}
          name={elem}
          className={elem === 'taskTitle' ? 'new-todo-form__timer' : 'new-todo'}
          placeholder={elem === 'taskTitle' ? 'Task' : `${elem}`}
          onChange={handleTaskChange}
          value={dataTask[elem]}
          type={elem === 'taskTitle' ? 'text' : 'number'}
        />
      ))}
      <button type="submit" style={{ display: 'none' }} aria-label="Submit task" />
    </form>
  )
}

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func.isRequired,
}

export default NewTaskForm
