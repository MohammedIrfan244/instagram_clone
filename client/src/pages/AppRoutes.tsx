import {Routes, Route} from 'react-router-dom'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import { useSelector } from 'react-redux'
import HomePage from './HomePage'

function AppRoutes(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {user} = useSelector((state: { user: any }) => state.user)
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/user/register" element={<RegisterPage />} />
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/home" element={user ? <HomePage/> : <LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
