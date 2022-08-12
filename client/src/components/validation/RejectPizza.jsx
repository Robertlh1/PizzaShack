import React, { useContext} from 'react'
import { PizzaContext } from '../../context'

function RejectPizza() {
  const { pizzaError } = useContext(PizzaContext)

  if (pizzaError !== false) {
    if (pizzaError === 'noToppings') {
      return (
        <p>Please select at least one topping to add to your new pizza!</p>
      )
    }
    if (pizzaError === 'duplicatePizza') {
      return (
        <p>A pizza with identical toppings already exists.</p>
      )
    }
    if (pizzaError === 'sameName') {
      return (
        <p>A pizza with the same name already exists.</p>
      )
    }
  }
  return (
    <div></div>
  )
}

export default RejectPizza