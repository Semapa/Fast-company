import React from 'react'
import PropTypes from 'prop-types'
import TableHeader from '../common/table/tableHeader'
import TableBody from '../common/table/tableBody'
import BookMark from '../common/bookmark'
import Qualities from './qualities'
import Table from '../common/table'
import { Link } from 'react-router-dom'
import Profession from './profession'

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark
  // onDelete
  // ...rest
}) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities qualitiesList={user.qualities} />
    },
    professions: {
      name: 'Профессия',
      component: (user) => <Profession id={user.profession} />
    },
    complitedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark
          id={user._id}
          status={user.bookmark}
          onToggleBookMark={onToggleBookMark}
        />
      )
    }
    // delete: {
    //   component: (user) => (
    //     <button onClick={() => onDelete(user._id)} className="btn btn-danger">
    //       Delete
    //     </button>
    //   )
    // }
  }
  return (
    <Table>
      <TableHeader {...{ onSort, selectedSort, columns }} />
      <TableBody {...{ columns, data: users }} />
    </Table>

    // Два варианта, можто передать сразу все в Tabel, но тогда не будет возможности настраивать
    // Заголовки например, второй вариант передать children, как наверху
    //   <Table
    //   onSort={onSort}
    //   selectedSort={selectedSort}
    //   columns={columns}
    //   data={users}
    // >
    // </Table>
  )
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
  // onDelete: PropTypes.func.isRequired
}

export default UserTable
