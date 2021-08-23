import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  console.log(users)

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => userId !== user._id))
  }

  const renderPhrase = (number) => {
    if (number === 0) {
      return <span className="badge bg-danger">Никто с тобой не тусанет</span>
    } else if (number > 1 && number < 5) {
      return (
        <span className="badge bg-primary">
          {number} человека тусанут с тобой сегодня
        </span>
      )
    } else {
      return (
        <span className="badge bg-primary">
          {number} человек тусанет с тобой сегодня
        </span>
      )
    }
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
              onClick={(event) => handleDelete(event.target.id)}
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
      <h1>{renderPhrase(users.length)}</h1>
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
