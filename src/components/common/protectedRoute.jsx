import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth()
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser) {
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
