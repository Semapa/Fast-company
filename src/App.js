import React, { useState } from 'react'
import Users from './components/users'
import api from './api'
import SearchStatus from './components/searchStatus'

function App() {
  const [users, setUsers] = useState(api.users.fetchAll())

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
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  )
}

export default App
