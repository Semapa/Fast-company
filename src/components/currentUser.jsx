import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import api from '../api/index'
import Loader from '../components/UI/Loader/loader'
import QualitiesList from './qualitiesList'

const CurrentUser = () => {
  const { userId } = useParams()

  const [users, setUsers] = useState()

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
  }, [])

  console.log('currentUser', userId)

  const renderUsers = () => {
    const currentUser = users.find((user) => user._id === userId)
    console.log('currentUser', currentUser)
    return (
      <>
        <h1>{currentUser.name}</h1>
        <h2>Профессия: {currentUser.profession.name}</h2>
        <QualitiesList qualities={currentUser.qualities} />
        <p>completedMeetings: {currentUser.completedMeetings} </p>
        <h3>Rate: {currentUser.rate}</h3>
      </>
    )
  }

  return <>{users ? <>{renderUsers()}</> : <Loader />}</>
}

export default CurrentUser
