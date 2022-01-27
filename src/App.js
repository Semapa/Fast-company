import React from 'react'
import { Route, Switch } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/common/protectedRoute'
import AppLoader from './components/ui/hoc/appLoader'
import NavBar from './components/ui/navBar'
import AuthProvider from './hooks/useAuth'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import Login from './layouts/login'
import Logout from './layouts/logout'
import LayoutMain from './layouts/main'
import LayoutUsers from './layouts/users'

function App() {
  return (
    <div>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <QualitiesProvider>
            <ProfessionProvider>
              <Switch>
                <ProtectedRoute
                  path="/users/:userId?/:edit?"
                  component={LayoutUsers}
                />
                <Route path="/login/:type?" component={Login} />
                <Route path="/logout" component={Logout} />
                <Route path="/" exact component={LayoutMain} />
              </Switch>
            </ProfessionProvider>
          </QualitiesProvider>
          <ToastContainer />
        </AuthProvider>
      </AppLoader>
    </div>
  )
}

export default App
