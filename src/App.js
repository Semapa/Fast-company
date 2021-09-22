import React from 'react'
import { Route, Switch } from 'react-router'
import LayoutLogin from './layouts/login'
import LayoutMain from './layouts/main'
import LayoutUsers from './layouts/users'

function App() {
  return (
    <Switch>
      <Route path="/users/:userId?" component={LayoutUsers} />
      <Route path="/login" component={LayoutLogin} />
      <Route path="/" exact component={LayoutMain} />
    </Switch>
  )
}

export default App
