import React from 'react'
import PropTypes from 'prop-types'

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    // логика для измениния порядка сортировки
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      })
    } else {
      onSort({ path: item, order: 'asc' })
    }
  }

  const renderSortArrow = (item) => {
    const arrow =
      selectedSort.order === 'asc' ? (
        <i className="bi bi-caret-down-fill"></i>
      ) : (
        <i className="bi bi-caret-up-fill"></i>
      )
    return selectedSort.path === item.path ? arrow : null
  }

  return (
    <thead>
      <tr>
        {Object.keys(columns).map((column) => (
          <th
            key={column}
            onClick={
              columns[column].path
                ? () => handleSort(columns[column].path)
                : undefined
            }
            // Если в объекте есть path, значит это заголовок по которому можно делать сортировку
            // назначаем ему роль кнопки
            {...{ role: columns[column].path && 'button' }}
            scope="col"
          >
            {columns[column].name}
            {renderSortArrow(columns[column])}
          </th>
        ))}
      </tr>
    </thead>
  )
}

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
}

export default TableHeader
