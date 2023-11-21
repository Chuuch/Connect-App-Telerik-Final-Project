// import { useState } from 'react'
import './index.css'
import { Home } from './views/Home/Home'
// import { Login } from './views/Login/Login'
import { Register } from './views/Register/Register'
// import { Route } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Register />
      {/* <Login /> */}
      <Home />
    </div>
  )
}

export default App
