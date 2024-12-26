import {Routes, Route} from 'react-router-dom'
import LandingPage from './LandingPage'
import Register from '../components/Register'
import Login from '../components/Login'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/register" element={<Register />} />
      <Route path="/user/login" element={<Login />} />
    </Routes>
  )
}

export default AppRoutes
