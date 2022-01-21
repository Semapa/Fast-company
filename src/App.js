import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProtectedRoute from './components/common/protectedRoute'
import NavBar from './components/ui/navBar'
import AuthProvider from './hooks/useAuth'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import Login from './layouts/login'
import Logout from './layouts/logout'
import LayoutMain from './layouts/main'
import LayoutUsers from './layouts/users'
import { loadQualitiesList } from './store/qualities'

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadQualitiesList())
  }, [])
  return (
    <div>
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
    </div>
  )
}

export default App
