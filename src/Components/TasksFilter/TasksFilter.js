import React, { useState } from 'react'
import PropTypes from 'prop-types'

function TasksFilter({ onFilterChange = () => {} }) {
  const [activeFilter, setActiveFilter] = useState({
    All: true,
    Active: false,
    Completed: false,
  })

  const handleFilterClick = (e) => {
    const selected = e.target.textContent

    setActiveFilter(() => ({
      All: false,
      Active: false,
      Completed: false,
      [selected]: true,
    }))

    onFilterChange(selected)
  }

  return (
    <ul className="filters">
      {['All', 'Active', 'Completed'].map((filter) => (
        <li key={filter}>
          <button className={activeFilter[filter] ? 'selected' : ''} type="button" onClick={handleFilterClick}>
            {filter}
          </button>
        </li>
      ))}
    </ul>
  )
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func,
}

export default TasksFilter
