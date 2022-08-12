import React, { useState, useContext } from 'react'
import ReactModal from 'react-modal'
import { PizzaContext } from '../context'
import axios from 'axios'
import RejectTopping from './validation/RejectTopping.jsx'
import checkForSameTopping from './validation/checkForSameTopping'
import dbUpdate from './dbUpdate'

function AddTopping() {
  const [ ModalState, setModalState ] = useState(false)
  const { toppings, setToppings, toppingError, setToppingError, setPizzas } = useContext(PizzaContext)

  function openModal() {
    setModalState(true)
  }

  function closeModal() {
    setModalState(false)
  }

  function submitTopping(event) {
    event.preventDefault()
    let newIngredient = event.target.name.value[0].toUpperCase() + event.target.name.value.slice(1).toLowerCase()

    if (!checkForSameTopping(toppings, newIngredient)) {
      setToppingError(false)
      axios.post('/toppings', {topping: newIngredient})
      .then(() => {
        dbUpdate(setToppings, setPizzas)
      })
      closeModal()
    } else {
      setToppingError(true)
    }
  }

  return (
    <div>
      <button className="popButton" onClick={openModal}>New Topping</button>

      <ReactModal
        ariaHideApp={false}
        className="Modal"
        overlayClassName="Overlay"
        isOpen={ModalState}
        onRequestClose={closeModal}
        contentLabel="Add New Topping"
        shouldCloseOnOverlayClick={true}
      >
        <h3>Add New Topping</h3>
        <RejectTopping />
        <form onSubmit={submitTopping}>
          <input id="name" required placeholder="Jalapenos? Maybe."></input>
          <br></br>
          <input className="popButton" type="submit" placeholder="newTopping"></input>
        </form>
      </ReactModal>
    </div>
  )
}

export default AddTopping