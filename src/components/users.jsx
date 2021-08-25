import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  console.log(users)

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => userId !== user._id))
  }

  const renderPhrase = (number) => {
    // определяем последний символ в числе для больших чисел
    const lastOne = Number(number.toString().slice(-1))
    if (number > 4 && number < 15) return 'человек тусанет'
    if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут'
    if (lastOne === 1) return 'человек тусанет'
    return 'человек тусанет'
  }

  const renderQualities = (qualities) => {
    let classes = 'badge m-1 bg-'
    return qualities.map((item) => {
      return (
        <span key={item._id} className={classes + item.color}>
          {item.name}
        </span>
      )
    })
  }

  const renderBody = () => {
    return users.map((user) => {
      return (
        <tr key={user._id}>
          <td scope="row">{user.name}</td>
          <td>{renderQualities(user.qualities)}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate} / 5</td>
          <td>
            <button
              onClick={() => handleDelete(user._id)}
              className="btn btn-danger"
              id={user._id}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <h2>
        <span
          className={'badge bg-' + (users.length > 0 ? 'primary' : 'danger')}
        >
          {users.length > 0
            ? `${users.length} ${renderPhrase(users.length)} с тобой сегодня`
            : 'Никто с тобой не тусанет'}
        </span>
      </h2>
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      )}
    </>
  )
}

export default Users
