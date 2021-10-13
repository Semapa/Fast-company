import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import api from '../../../api/index'
import Loader from '../../ui/loader/loader'
import Qualities from '../../ui/qualities'

const User = () => {
  // деструкторизация входящих пропсов через хук
  const { userId } = useParams()
  const [user, setUser] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const history = useHistory()

  useEffect(() => {
    api.users.getById(userId).then((data) => {
      setUser(data)
      setIsLoading(false)
    })
  }, [])

  const handleChange = (id) => {
    history.push(`/users/${id}/edit`)
  }

  const renderUsers = () => {
    return (
      <div className="mx-4">
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings} </p>
        <h3>Rate: {user.rate}</h3>
        <button onClick={() => handleChange(user._id)}>Изменить</button>
      </div>
    )
  }

  return <>{isLoading ? <Loader /> : <>{renderUsers()}</>}</>
}

export default User
