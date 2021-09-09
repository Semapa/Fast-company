import React, { useState } from 'react'
import Users from './components/users'
import api from './api'

function App() {
  const [users, setUsers] = useState(() => {
    return api.users.fetchAll().map((user) => {
      user.bookMark = false
      return user
    })
  })

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
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  )
}

export default App
