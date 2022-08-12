import React, { useState, useContext } from 'react'
import ReactModal from 'react-modal'
import { PizzaContext } from '../context'
import axios from 'axios'
import dbUpdate from './dbUpdate'
import checkForSameTopping from './validation/checkForSameTopping'
import RejectTopping from './validation/RejectTopping.jsx'

function Topping({topping}) {
  const [ ModalState, setModalState ] = useState(false)
  const [ toppingName, setToppingName ] = useState(topping.name)
  const { toppings, setPizzas, setToppings, setToppingError } = useContext(PizzaContext)

  function openModal() {
    setModalState(true)
  }

  function closeModal() {
    setModalState(false)
  }

  function changeName(event) {
    setToppingName(event.target.value)
  }

  function editTopping(event) {
    event.preventDefault()
    if (!checkForSameTopping(toppings, toppingName)) {
      setToppingError(false)
      axios.put('/toppings', {name: toppingName, index: topping.id})
      dbUpdate(setToppings, setPizzas)
      closeModal()
    } else {
      setToppingError(true)
    }
  }

  function deleteTopping(event) {
    event.preventDefault()
    axios.delete('/toppings', {data: {index: topping.id}})
    dbUpdate(setToppings, setPizzas)
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
      <h3>Edit Or Delete Topping</h3>
      <RejectTopping />
      <form onSubmit={editTopping}>
        <input value={toppingName} onChange={changeName}></input>
        <br></br>
        <input type="submit" className="popButton" value="Edit Topping" placeholder="editTopping"></input>
        <button className="popButton" onClick={deleteTopping} placeholder="deleteTopping">Delete Topping</button>
      </form>
      </ReactModal>
      <p className="topping" key={topping.index} onClick={openModal}>{topping.name}</p>
    </>
  )
}

export default Topping