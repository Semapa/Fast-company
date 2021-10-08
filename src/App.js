import React from 'react'
import { Route, Switch } from 'react-router'
import NavBar from './components/ui/navBar'
import Login from './layouts/login'
import LayoutMain from './layouts/main'
import LayoutUsers from './layouts/users'

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?" component={LayoutUsers} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={LayoutMain} />
      </Switch>
    </div>
  )
}

export default App
