// import { useState } from 'react'

import { Navbar } from './components/Navbar/Navbar'
import './index.css'
import { Login } from './views/Login/Login'
import { Register } from './views/Register/Register'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      <Register />
      <Login />
      <Navbar />
    </div>
  )
}

export default App
