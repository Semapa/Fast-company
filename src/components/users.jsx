import React, { useState } from 'react'
import api from '../api'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())
  console.log(users)

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => userId !== user._id))
  }

  const renderPhrase = (number) => {
    let phrase
    number > 1 && number < 5
      ? (phrase = 'человека тусанут')
      : (phrase = 'человек тусанет')
    return `${number} ${phrase} с тобой сегодня`
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
      <h1>
        <span className="badge bg-primary">{renderPhrase(users.length)}</span>
      </h1>
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
    </>
  )
}

export default Users
