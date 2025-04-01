import './TaskList.css'
import PropTypes from 'prop-types'

import Task from '../Task'

function TaskList({ tasks, onDeleted, onToggleDone, onEditItem }) {
  return (
    <ul className="todo-list">
      {tasks.map(({ id, ...taskProps }) => (
        <li key={id} className="todo-list-item">
          <Task
            {...taskProps}
            id={id}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onEditItem={onEditItem}
          />
        </li>
      ))}
    </ul>
  )
}

TaskList.defaultProps = {
  tasks: [],
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditItem: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
}

export default TaskList
