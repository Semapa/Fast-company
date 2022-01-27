import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import UsersLoader from '../components/ui/hoc/usersLoader'
import { UserProvider } from '../hooks/useUsers'

import EditDataUser from '../page/editDataUser'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
  const { userId, edit } = useParams()
  // const currentUserId = useSelector(getCurrentUserId())

  return (
    <>
      <UsersLoader>
        <UserProvider>
          {userId ? (
            edit ? (
              <EditDataUser />
            ) : (
              <UserPage userId={userId} />
            )
          ) : (
            <UsersListPage />
          )}
        </UserProvider>
      </UsersLoader>
    </>
  )
}

export default Users
