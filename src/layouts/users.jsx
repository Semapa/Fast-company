import React from 'react'
import { useParams } from 'react-router'
import { UserProvider } from '../hooks/useUsers'
import { QualitiesProvider } from '../hooks/useQualities'
import EditDataUser from '../page/editDataUser'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
  const { userId, edit } = useParams()

  return (
    <>
      <UserProvider>
        <QualitiesProvider>
          {userId ? (
            edit ? (
              <EditDataUser />
            ) : (
              <UserPage userId={userId} />
            )
          ) : (
            <UsersListPage />
          )}
        </QualitiesProvider>
      </UserProvider>
    </>
  )
}

export default Users
