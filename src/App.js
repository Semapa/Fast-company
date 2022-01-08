import React from 'react'
import { Route, Switch } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import NavBar from './components/ui/navBar'
import AuthProvider from './hooks/useAuth'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import Login from './layouts/login'
import LayoutMain from './layouts/main'
import LayoutUsers from './layouts/users'

function App() {
  return (
    <div>
      <AuthProvider>
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
      </AuthProvider>
    </div>
  )
}

export default App
