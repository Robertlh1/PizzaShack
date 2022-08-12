import axios from 'axios'

async function update(setToppings, setPizzas) {
  axios.get('/toppings')
  .then(resp => {
    setToppings(resp.data)
  })

  axios.get('/pizzas')
  .then(resp => {
    setPizzas(resp.data)
  })
}

export default update