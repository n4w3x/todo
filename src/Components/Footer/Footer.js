import TasksFilter from '../TasksFilter';
import './Footer.css';
import PropTypes from 'prop-types';

function Footer({ count, onFilterChange, clearCompleted }) {
  return (
    <footer className="footer">
      <span className="todo-count">{count} items left</span>
      <TasksFilter onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearCompleted}>Clear completed</button>
    </footer>
  );
}

Footer.defaultProps = {
  count: 0,
  onFilterChange: () => {},
  clearCompleted: () => {},
};

Footer.propTypes = {
  count: PropTypes.number,
  onFilterChange: PropTypes.func,
  clearCompleted: PropTypes.func
};

export default Footer;