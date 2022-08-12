import React, { useContext } from 'react'
import { PizzaContext } from '../context'
import AddPizza from './AddPizza.jsx'
import Pizza from './Pizza.jsx'

function PizzasList() {
  const { pizzas, setPizzas } = useContext(PizzaContext)

  if (pizzas !== null && pizzas.length !== 0) {
    return (
      <div className="pizzaCards">
        <h3 className="mainText">Click on a pizza to edit or delete it.</h3>
        {pizzas.map((pizza, index) => {
          return (
            <Pizza key={index} pizza={pizza} index={index}/>
          )
        })}
        <AddPizza />
      </div>
    )
  } else {
    return (
      <div className="pizzaCards">
        <h3>No Pizzas</h3>
        <AddPizza />
      </div>
    )
  }
}

export default PizzasList