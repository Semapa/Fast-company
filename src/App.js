import React, { useState, useEffect } from 'react'
import Users from './components/users'
import Loader from './components/UI/Loader/loader'
import api from './api/index'

function App() {
  const [users, setUsers] = useState()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
      setLoader(false)
    })
  }, [])

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => userId !== user._id))
  }

  const handleToggleBookMark = (id) => {
    setUsers(
      users.filter((user) => {
        if (user._id === id) {
          user.bookMark = !user.bookMark
          return user
        }
        return user
      })
    )
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Users
          users={users}
          onDelete={handleDelete}
          onToggleBookMark={handleToggleBookMark}
        />
      )}
    </>
  )
}

export default App
