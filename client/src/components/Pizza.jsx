import React, { useContext, useState, useEffect } from 'react'
import ReactModal from 'react-modal'
import { PizzaContext } from '../context'
import axios from 'axios'
import RejectPizza from './validation/RejectPizza.jsx'
import dbUpdate from './dbUpdate'
import comparePizzas from './validation/comparePizzas'

function Pizza(pie, index) {
  let pizza = pie.pizza
  const { toppings, pizzas, setPizzas, setToppings, setPizzaError } = useContext(PizzaContext)
  const [ ModalState, setModalState ] = useState(false)
  const [ checkedToppings, setCheckedToppings ] = useState(new Array(toppings.length).fill(false))
  const [ pizzaName, setPizzaName ] = useState(pizza.pizza_name)

  useEffect(() => {
    let temp = checkedToppings
    for (let i = 0; i < pizza.topping_index.length; i++) {
      temp[pizza.topping_index[i]] = true
    }
    setCheckedToppings(temp)
  }, [])

  function handleTopping(event) {
    let id = event.target.id
    let temp = [...checkedToppings]
    if (temp[id]) {
      temp[id] = false
    } else {
      temp[id] = true
    }
    setCheckedToppings(temp)
  }

  function handleName(event) {
    setPizzaName(event.target.value)
  }

  function openModal() {
    setModalState(true)
  }

  function closeModal() {
    setModalState(false)
  }

  function editPizza(event) {
    event.preventDefault()
    let sameName = false
    let duplicate = false
    let pizzaToppings = []

    for (let i = 0; i < toppings.length; i++) {
      if (checkedToppings[i]) {
        pizzaToppings.push(i + 1)
      }
    }

    for (let j = 0; j < pizzas.length; j++) {
      if (pizzas[j].pizza_name === pizzaName && pizzas[j].pizza_id !== pizza.pizza_id) {
        sameName = true
      }
      if (comparePizzas(pizzas[j].topping_index, pizzaToppings)) {
        duplicate = true
      }

      if (sameName || duplicate) {
        break
      }
    }

    if (pizzaToppings.length === 0) {
      setPizzaError('noToppings')
    } else if (sameName) {
      setPizzaError('sameName')
    } else if (duplicate) {
      setPizzaError('duplicatePizza')
    } else {
      let updatedPizza = {
        pizza_id: pizza.pizza_id,
        pizza_name: pizzaName,
        toppings: checkedToppings
      }
      axios.put('/pizzas', updatedPizza)
      setTimeout(() => {
        dbUpdate(setToppings, setPizzas)
      }, 200)
      closeModal()
    }
  }

  function deletePizza(event) {
    event.preventDefault()
    axios.delete('/pizzas', {data: {pizza_id: pizza.pizza_id }})
    .then(() => {
      dbUpdate(setToppings, setPizzas)
    })
    closeModal()
  }

  return (
    <>
      <ReactModal
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
        isOpen={ModalState}
        onRequestClose={closeModal}
        contentLabel="Add New Pizza"
        shouldCloseOnOverlayClick={true}
      >
      <h3>Edit Or Delete Pizza</h3>
      <RejectPizza />
      <form onSubmit={editPizza}>
          <input id="name" value={pizzaName} onChange={handleName} required></input>
          <ul className="checkboxes">
            {toppings.map((topping, index) => {
              return (
                <label className="label" key={index}>
                  <input type="checkbox" name="ingredient" id={index} checked={checkedToppings[index]} onChange={handleTopping} placeholder={topping.name}/> {topping.name}
                </label>
              )
            })}
          </ul>
          <input type="submit" value="Save Changes" className="popButton"></input>
          <button onClick={deletePizza} className="popButton">Delete Pizza</button>
        </form>
      </ReactModal>
      <div key={index} className="pizza" onClick={openModal}>
        <h4>{pizza.pizza_name}</h4>
        <p>Toppings:</p>
        {pizza.toppings.map((ingredient, index) => {
          return (
            <p key={index} className="pizzaText">{ingredient},&nbsp;</p>
          )
        })}
      </div>
    </>
  )
}

export default Pizza