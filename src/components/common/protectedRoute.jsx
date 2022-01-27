import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../../store/users'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const isLogggedIn = useSelector(getIsLoggedIn())
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLogggedIn) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                // в state можно сохранить текущие параметры, в данном случае путь куда переадресовываем пользователя
                state: { from: props.location }
              }}
            />
          )
        }
        return Component ? <Component {...props} /> : children
      }}
    />
  )
}

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
export default ProtectedRoute
