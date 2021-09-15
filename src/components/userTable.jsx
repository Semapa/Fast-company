import React from 'react'
import PropTypes from 'prop-types'
// import User from './user'
import TableHeader from './tableHeader'
import TableBody from './tableBody'
import BookMark from './bookmark'

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete,
  ...rest
}) => {
  const columns = {
    name: { path: 'name', name: 'Имя' },
    quolities: { name: 'Качества' },
    professions: { path: 'profession.name', name: 'Профессия' },
    complitedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark
          id={user._id}
          status={user.bookMark}
          onToggleBookMark={onToggleBookMark}
        />
      )
    },
    delete: {
      component: (user) => (
        <button onClick={() => onDelete(user._id)} className="btn btn-danger">
          Delete
        </button>
      )
    }
  }

  return (
    <table className="table">
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
      {/* <tbody>
        {users.map((user) => (
          <User key={user._id} user={user} {...rest} />
        ))}
      </tbody> */}
    </table>
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default UserTable
