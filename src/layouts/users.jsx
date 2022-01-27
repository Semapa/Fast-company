import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Loader from '../components/ui/loader/loader'
import { UserProvider } from '../hooks/useUsers'

import EditDataUser from '../page/editDataUser'
import UserPage from '../page/userPage'
import UsersListPage from '../page/usersListPage'
import { getDataStatus, loadUsersList } from '../store/users'

const Users = () => {
  const { userId, edit } = useParams()
  const dataStatus = useSelector(getDataStatus())
  const dispatch = useDispatch()

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList())
  }, [])

  if (!dataStatus) return <Loader />

  return (
    <>
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
    </>
  )
}

export default Users
