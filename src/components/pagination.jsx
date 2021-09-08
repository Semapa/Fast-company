import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

const Pagination = ({ onPageChange, itemCount, pageSize, currentPage }) => {
  const pageCount = Math.ceil(itemCount / pageSize)
  if (pageCount === 1) return null
  // Создаем массив из номеров страниц(+1 т.к. в метод не включается последний элемент)
  const pages = _.range(1, pageCount + 1)

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={'page-item ' + (page === currentPage ? 'active' : '')}
            key={page}>
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default Pagination
