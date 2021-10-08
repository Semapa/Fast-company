import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ id, status, onToggleBookMark }) => {
  return (
    <button
      onClick={() => onToggleBookMark(id)}
      type="button"
      className="btn btn-outline-success">
      <i className={`bi bi-bookmark${status ? '-fill' : ''}`}></i>
    </button>
  )
}

BookMark.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.bool,
  onToggleBookMark: PropTypes.func.isRequired
}

export default BookMark
