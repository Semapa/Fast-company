import React from 'react'
import { useParams } from 'react-router'
import EditDataUser from '../components/page/editDataUser'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'

const Users = () => {
  const { userId } = useParams()
  const { edit } = useParams()

  const renderComponent = () => {
    if (edit) return <EditDataUser userId={userId} />

    if (userId) {
      return <UserPage userId={userId} />
    } else {
      return <UsersListPage />
    }
  }

  return renderComponent()
}

export default Users
