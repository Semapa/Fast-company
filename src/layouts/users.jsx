import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import UsersLoader from '../components/ui/hoc/usersLoader'
import EditDataUser from '../page/editDataUser'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'

const Users = () => {
  const { userId, edit } = useParams()
  // const currentUserId = useSelector(getCurrentUserId())

  return (
    <>
      <UsersLoader>
        {userId ? (
          edit ? (
            <EditDataUser />
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UsersLoader>
    </>
  )
}

export default Users
