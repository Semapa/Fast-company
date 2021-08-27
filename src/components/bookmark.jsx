import React from 'react'

const BookMark = ({ id, status, onToggleBookMark }) => {
  return (
    <button
      onClick={() => onToggleBookMark(id)}
      type="button"
      className="btn btn-outline-success"
    >
      <i className={`bi bi-bookmark${status ? '-fill' : ''}`}></i>
    </button>
  )
}

export default BookMark
