import {Routes, Route} from 'react-router-dom'
import LandingPage from './LandingPage'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import { useSelector } from 'react-redux'
import {RootState} from '../redux/store.ts'
import HomePage from './HomePage'

function AppRoutes(): JSX.Element {
  const {currentUser} = useSelector((state: RootState) => state.currentUser)
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} /> 
      <Route path="/user/register" element={<RegisterPage />} />
      <Route path="/user/login" element={<LoginPage />} />
      <Route path="/home" element={currentUser ? <HomePage/> : <LoginPage />} />
    </Routes>
  )
}

export default AppRoutes
