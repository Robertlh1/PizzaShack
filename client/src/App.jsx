import React, { useState, useMemo, useEffect } from 'react'
import { PizzaContext } from './context'
import axios from 'axios'
import LoginSelect from './components/LoginSelect.jsx'
import PizzasList from './components/PizzasList.jsx'
import ToppingsList from './components/ToppingsList.jsx'
import dbUpdate from './components/dbUpdate'

function App() {
  const [toppings, setToppings] = useState(null)
  const [pizzas, setPizzas] = useState(null)
  const [ toppingError, setToppingError ] = useState(false)
  const [ pizzaError, setPizzaError ] = useState(false)
  const [ login, setLogin ] = useState(false)

  useEffect(() => {
    dbUpdate(setToppings, setPizzas)
  }, [])

  let pizzaProvider = useMemo(() => (
    {toppings, setToppings, pizzas, setPizzas, toppingError, setToppingError, pizzaError, setPizzaError, login, setLogin}
  ),
    [toppings, setToppings, pizzas, setPizzas, toppingError, pizzaError, login]
  )

  function logout() {
    setLogin(false)
  }

  if (login === 'Owner') {
    return (
      <PizzaContext.Provider value={pizzaProvider}>
        <h1 className="mainText">Welcome back Bob! <button className="popButton" onClick={logout}>Logout</button></h1>
        <ToppingsList />
      </PizzaContext.Provider>
    )
  }
  if (login === 'Chef') {
    return (
      <PizzaContext.Provider value={pizzaProvider}>
        <h1 className="mainText">Welcome back Chef! <button className="popButton" onClick={logout}>Logout</button></h1>
        <PizzasList />
      </PizzaContext.Provider>
    )
  }
  return (
    <div>
      <h1 className="mainText">Welcome to Bob's Pizza Shack</h1>
      <h2 className="mainText">Please choose your role to continue.</h2>
      <PizzaContext.Provider value={pizzaProvider}>
        <LoginSelect />
      </PizzaContext.Provider>
    </div>
  )
}

export default App