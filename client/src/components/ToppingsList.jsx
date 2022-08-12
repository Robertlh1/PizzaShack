import React, { useContext } from 'react'
import { PizzaContext } from '../context'
import AddTopping from './AddTopping.jsx'
import Topping from './Topping.jsx'

function ToppingsList() {
  const { toppings, setToppings } = useContext(PizzaContext)
  if (toppings !== null && toppings.length !== 0) {
    return (
      <div className="toppingCards">
        <h3 className="mainText">Toppings:</h3>
        {toppings.map((topping, index) => {
          return (
            <Topping key={index} topping={{id: topping.id, name: topping.name, index: index}} />
          )
        })}
        <AddTopping />
      </div>
    )
  } else {
    return (
      <div>
        <h3>No Toppings</h3>
        <AddTopping />
      </div>
    )
  }
}

export default ToppingsList