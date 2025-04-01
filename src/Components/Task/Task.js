import './Task.css'
import { formatDistanceToNow } from 'date-fns'
import { Component } from 'react'
import PropTypes from 'prop-types'

export default class Task extends Component {
  state = {
    isEditing: false,
    newDescription: this.props.description,
  }

  handleEditClick = () => {
    this.setState({ isEditing: true })
  }

  handleSaveClick = () => {
    const { onEditItem, id } = this.props
    const { newDescription } = this.state

    if (newDescription !== this.props.description) {
      onEditItem(id, newDescription)
    }

    this.setState({ isEditing: false })
  }

  handleChange = (event) => {
    this.setState({ newDescription: event.target.value })
  }

  handleBlur = () => {
    this.handleSaveClick()
  }

  render() {
    const { description, created, onDeleted, onToggleDone, done, id } = this.props
    const { isEditing, newDescription } = this.state
    const distanceToNow = formatDistanceToNow(new Date(created), {
      includeSeconds: true,
    })

    let classNames = 'description'
    if (done) {
      classNames += ' done'
    }

    return (
      <div className="task">
        <div className="view">
          <input className="toggle" type="checkbox" checked={done} onChange={onToggleDone} />

          <label>
            {isEditing ? (
              <input
                type="text"
                value={newDescription}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                autoFocus
              />
            ) : (
              <span className={classNames} onClick={onToggleDone}>
                {description}
              </span>
            )}

            <span className="created">created {distanceToNow} ago</span>
          </label>

          <button className="icon icon-edit" onClick={this.handleEditClick} />

          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
      </div>
    )
  }
}

Task.defaultProps = {
  done: false,
  onDeleted: () => {},
  onToggleDone: () => {},
  onEditItem: () => {},
}

Task.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  onEditItem: PropTypes.func,
  done: PropTypes.bool,
}
