import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList
} from '../../../store/users'
import Loader from '../loader/loader'
import { loadQualitiesList } from '../../../store/qualities'
import { loadProfessionsList } from '../../../store/professions'

const AppLoader = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(getIsLoggedIn())
  const usersStausLoading = useSelector(getUsersLoadingStatus())

  useEffect(() => {
    dispatch(loadQualitiesList())
    dispatch(loadProfessionsList())
    if (isLoggedIn) {
      dispatch(loadUsersList())
    }
  }, [isLoggedIn])
  if (usersStausLoading) return <Loader />
  return children
}

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default AppLoader
