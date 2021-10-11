import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import api from '../../../api/index'
import Loader from '../../ui/loader/loader'
import Qualities from '../../ui/qualities'

const User = () => {
  // деструкторизация входящих пропсов через хук
  const { userId } = useParams()
  const [users, setUsers] = useState()

  const history = useHistory()

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
  }, [])

  const handleChange = (id) => {
    history.push(`/users/${id}/edit`)
  }

  const renderUsers = () => {
    const currentUser = users.find((user) => user._id === userId)

    return currentUser ? (
      <div className="mx-4">
        <h1>{currentUser.name}</h1>
        <h2>Профессия: {currentUser.profession.name}</h2>
        <Qualities qualities={currentUser.qualities} />
        <p>completedMeetings: {currentUser.completedMeetings} </p>
        <h3>Rate: {currentUser.rate}</h3>
        <button onClick={() => handleChange(currentUser._id)}>Изменить</button>
      </div>
    ) : (
      <Loader />
    )
  }

  return <>{users ? <>{renderUsers()}</> : <Loader />}</>
}

export default User
