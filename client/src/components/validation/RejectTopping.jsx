import React, { useContext } from 'react'
import { PizzaContext } from '../../context'

function RejectTopping() {
  const { toppingError } = useContext(PizzaContext)
  if (toppingError) {
    return (
      <div>Sorry, this topping is already in our list! Please try again.</div>
    )
  }
  return (
    <div></div>
  )
}

export default RejectTopping