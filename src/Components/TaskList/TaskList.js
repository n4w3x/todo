import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task/Task'

function TaskList({
  tasks = [],
  onDelete = () => {},
  onToggleEditMode = () => {},
  onEditTask = () => {},
  onTogglePlay = () => {},
  changeTitle = () => {},
}) {
  return tasks.map(({ description, modeEdit, created, id, valueSec, play }) => (
    <Task
      changeTitle={changeTitle}
      key={id}
      id={id}
      description={description}
      modeEdit={modeEdit}
      created={created}
      onDelete={onDelete}
      onToggleEditMode={onToggleEditMode}
      onEditTask={onEditTask}
      durationMs={Number(valueSec) * 1000}
      onTogglePlay={onTogglePlay}
      play={play}
    />
  ))
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      modeEdit: PropTypes.string,
      created: PropTypes.number,
      id: PropTypes.number,
      valueMin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      valueSec: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      play: PropTypes.bool,
    })
  ),
  onDelete: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  onEditTask: PropTypes.func,
  onTogglePlay: PropTypes.func,
}

export default TaskList
