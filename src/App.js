import React, { useState } from 'react'
import Users from './components/users'
import api from './api'
import SearchStatus from './components/searchStatus'

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
    const newUsers = [...users]
    const indexUser = newUsers.findIndex((user) => user._id === id)
    newUsers[indexUser].bookMark = !newUsers[indexUser].bookMark
    setUsers(newUsers)
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
