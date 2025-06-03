import { Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import DashboardPage from './Pages/DashboardPage'
import ProtectedRoute from './Components/ProtectedRoutes'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App