import React, { useContext } from 'react'
import { PizzaContext } from '../context'

function LoginSelect() {
  const { login, setLogin } = useContext(PizzaContext)

  function handleLogin(event) {
    setLogin(event.target.name)
  }

  if (!login) {
    return (
      <div>
        <button name="Chef" className="popButton" onClick={handleLogin}>Pizza Chef</button>
        <button name="Owner" className="popButton" onClick={handleLogin}>Store Owner</button>
      </div>
    )
  }
}

export default LoginSelect