import React, { useState } from 'react'
import PropTypes from 'prop-types'
import User from './user'
import Pagination from './pagination'
import { paginate } from '../utils/paginate'

const Users = ({ users: allUsers, ...rest }) => {
  const count = allUsers.length
  const pageSize = 4
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  // Разбиваем основной массив c users на части
  // в соответствии с количеством user-ов на одной странице
  const users = paginate(allUsers, currentPage, pageSize)
  return (
    <>
      {count > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col">Избранное</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <User key={user._id} user={user} {...rest} />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}
export default Users
