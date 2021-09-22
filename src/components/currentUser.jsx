import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import api from '../api/index'
import Loader from '../components/UI/Loader/loader'
import QualitiesList from './qualitiesList'

const CurrentUser = () => {
  // деструкторизация входящих пропсов через хук
  const { userId } = useParams()
  const [users, setUsers] = useState()

  const history = useHistory()

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
  }, [])

  const handleBack = () => {
    history.push('/users')
  }

  const renderUsers = () => {
    const currentUser = users.find((user) => user._id === userId)

    return currentUser ? (
      <section className="mx-4">
        <h1>{currentUser.name}</h1>
        <h2>Профессия: {currentUser.profession.name}</h2>
        <QualitiesList qualities={currentUser.qualities} />
        <p>completedMeetings: {currentUser.completedMeetings} </p>
        <h3>Rate: {currentUser.rate}</h3>
        <button onClick={() => handleBack()}>Все пользователи</button>
      </section>
    ) : (
      <Loader />
    )
  }

  return <>{users ? <>{renderUsers()}</> : <Loader />}</>
}

export default CurrentUser
