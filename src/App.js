import React from 'react'
import { Route, Switch } from 'react-router'
import { ToastContainer } from 'react-toastify'
import NavBar from './components/ui/navBar'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import Login from './layouts/login'
import LayoutMain from './layouts/main'
import LayoutUsers from './layouts/users'

function App() {
  return (
    <div>
      <NavBar />
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/users/:userId?/:edit?" component={LayoutUsers} />
            <Route path="/login/:type?" component={Login} />

            <Route path="/" exact component={LayoutMain} />
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>
      <ToastContainer />
    </div>
  )
}

export default App
