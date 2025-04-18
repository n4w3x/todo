import React, { useState, useEffect, useRef } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import { ru } from 'date-fns/locale'
import PropTypes from 'prop-types'

import { setTimer, getCurrentTime, toPlay, toPause } from '../Timer/Timer'

function Task({
  modeEdit = '',
  description = '',
  created = Date.now(),
  id = '',
  onDelete = () => {},
  onToggleEditMode = () => {},
  durationMs = 0,
  changeTitle = () => {},
}) {
  const [createdTimeText, setCreatedTimeText] = useState(
    formatDistanceToNowStrict(created, { addSuffix: true, locale: ru })
  )

  const [taskTitle, setTaskTitle] = useState(description)
  const [timerDisplay, setTimerDisplay] = useState(getCurrentTime(id))
  const [editValue, setEditValue] = useState(description)
  const [editMode, setEditMode] = useState(modeEdit)
  const [isChek, setIsChek] = useState(false)
  const editRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCreatedTimeText(formatDistanceToNowStrict(created, { addSuffix: true, locale: ru }))
    }, 30000)
    return () => clearInterval(interval)
  }, [created])

  useEffect(() => {
    if (editMode) {
      setIsChek(true)
    } else {
      setIsChek(false)
    }
    setTimer(setTimerDisplay, durationMs, id)
    const interval = setInterval(() => {
      setTimerDisplay(getCurrentTime(id))
    }, 1000)

    return () => clearInterval(interval)
  }, [durationMs, id, editMode])

  const handleInputChange = (e) => {
    setEditValue(e.target.value)
  }

  const handleChangeEdit = () => {
    setEditMode((mode) => {
      return mode === '' ? 'completed' : ''
    })
    setIsChek((chek) => !chek)
    onToggleEditMode(id, editMode)
  }
  const handleChangeEditEnter = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setEditMode(editRef.current)
      setTaskTitle(editValue)
      changeTitle(editValue, id)
    }
    if (e.key === 'Escape') {
      setEditMode(editRef.current)
      setEditValue(taskTitle)
    }
  }
  const handleChangePause = () => {
    toPause(id)
  }
  const handleChangePlay = () => {
    toPlay(id, setTimerDisplay)
  }

  const handleDelTask = () => {
    onDelete(id)
  }
  const handleChangeTask = () => {
    editRef.current = editMode
    setEditMode('editing')
  }

  return (
    <li className={editMode}>
      <div className="view">
        <input className="toggle" type="checkbox" readOnly id="tog" onChange={handleChangeEdit} checked={isChek} />

        <label htmlFor={`name+${id}`}>
          <span
            role="button"
            tabIndex={0}
            className="title"
            onClick={handleChangeEdit}
            onKeyDown={handleChangeEditEnter}
          >
            {taskTitle}
          </span>

          <span className="description">
            <button className="icon icon-play" type="button" aria-label="плей" onClick={handleChangePlay} />
            <button className="icon icon-pause" type="button" aria-label="пауза" onClick={handleChangePause} />
            {timerDisplay}
          </span>

          <span className="description">Создано: {createdTimeText}</span>
        </label>

        <button className="icon icon-edit" type="button" aria-label="Редактировать задачу" onClick={handleChangeTask} />

        <button className="icon icon-destroy" type="button" aria-label="Удалить задачу" onClick={handleDelTask} />
      </div>

      <input
        type="text"
        className="edit"
        id={`name+${id}`}
        onChange={handleInputChange}
        value={editValue}
        onKeyDown={handleChangeEditEnter}
      />
    </li>
  )
}

Task.propTypes = {
  modeEdit: PropTypes.string,
  description: PropTypes.string,
  created: PropTypes.number,
  id: PropTypes.number,
  onDelete: PropTypes.func,
  onToggleEditMode: PropTypes.func,
  durationMs: PropTypes.number,
  changeTitle: PropTypes.func,
}

export default Task
