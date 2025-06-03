import LoginForm from '../Components/LoginForm'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center login-container p-4">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col justify-center text-white p-8">
          <h1 className="text-4xl font-bold mb-4">EV Charging Network</h1>
          <p className="text-xl opacity-90">
            Find and manage charging stations across the country
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
