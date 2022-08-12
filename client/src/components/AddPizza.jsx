import React, { useState, useContext } from 'react'
import ReactModal from 'react-modal'
import { PizzaContext } from '../context'
import axios from 'axios'
import RejectPizza from './validation/RejectPizza.jsx'
import dbUpdate from './dbUpdate'
import comparePizzas from './validation/comparePizzas'

var initial = true
function AddPizza() {
  const [ ModalState, setModalState ] = useState(false)
  const { toppings, pizzas, setPizzas, setPizzaError, setToppings } = useContext(PizzaContext)
  const [ checkedToppings, setCheckedToppings ] = useState()

  if (toppings !== null && initial) {
    initial = false
    setCheckedToppings([new Array(toppings.length).fill(false)])
  }

  function openModal() {
    setModalState(true)
  }

  function closeModal() {
    setCheckedToppings([new Array(toppings.length).fill(false)])
    setModalState(false)
  }

  function handleTopping(event) {
    let id = event.target.id
    if (checkedToppings !== undefined) {
      let temp = [...checkedToppings]
      if (temp[0][id]) {
        temp[0][id] = false
      } else {
        temp[0][id] = true
      }
      setCheckedToppings(temp)
    }
  }

  function submitPizza(event) {
    event.preventDefault()
    let sameName = false
    let duplicate = false
    let pizzaToppings = []
    let tempToppings = []

    for (let i = 0; i < toppings.length; i++) {
      if (checkedToppings[0][i]) {
        pizzaToppings.push(i + 1)
        tempToppings.push(toppings[i].name)
      }
    }

    let newPizza = {
      name: event.target.name.value,
      ingredients: pizzaToppings
    }

    for (let j = 0; j < pizzas.length; j++) {
      if (pizzas[j].pizza_name === newPizza.name) {
        sameName = true
      }
      if (comparePizzas(pizzas[j].topping_index, newPizza.ingredients)) {
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
      axios.post('/pizzas', newPizza)
      .then(() => {
        dbUpdate(setToppings, setPizzas)
      })
      setPizzaError(false)
      setCheckedToppings([new Array(toppings.length).fill(false)])
      closeModal()
    }
  }

  if (toppings !== null) {
    return (
      <div>
        <button className="popButton" onClick={openModal}>New Pizza</button>

        <ReactModal
          ariaHideApp={false}
          className="Modal"
          overlayClassName="Overlay"
          isOpen={ModalState}
          onRequestClose={closeModal}
          contentLabel="Add New Pizza"
          shouldCloseOnOverlayClick={true}
        >
          <h3>Add New Pizza</h3>
          <RejectPizza />
          <form onSubmit={submitPizza}>
            <input id="name" placeholder="Pizza Name" required></input>
            <ul className="checkboxes">
              {toppings.map((topping, index) => {
                return (
                  <label className="label" key={index}>
                    <input type="checkbox" name="ingredient" id={index} onClick={handleTopping}/> {topping.name}
                  </label>
                )
              })}
            </ul>
            <input className="popButton" type="submit" placeholder="Submit"></input>
          </form>
        </ReactModal>
      </div>
    )
  }
}

export default AddPizza