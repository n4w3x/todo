import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

function Footer({ onFilterChange = () => {}, onClearCompleted = () => {} }) {
  return (
    <footer className="footer">
      <span className="todo-count">1 items left</span>
      <TasksFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
}

export default Footer
