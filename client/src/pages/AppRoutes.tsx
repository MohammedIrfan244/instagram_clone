import {Routes, Route} from 'react-router-dom'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/register" element={<RegisterPage />} />
      <Route path="/user/login" element={<LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
