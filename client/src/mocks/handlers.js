import { rest } from 'msw'
export const handlers = [
  rest.delete('/toppings', (req, res, ctx) => {
    return res(
      ctx.status(200),
    )
  }),
  rest.delete('/pizzas', (req, res, ctx) => {
    return res(
      ctx.status(200)
    )
  }),
  rest.put('/toppings', (req, res, ctx) => {
    return res(
      ctx.status(200)
    )
  }),
  rest.put('/pizzas', (req, res, ctx) => {
    return res(
      ctx.status(200)
    )
  }),
  rest.post('/pizzas', (req, res, ctx) => {
    return res(
      ctx.status(200),
    )
  }),
  rest.post('/toppings', (req, res, ctx) => {
    return res(
      ctx.status(200),
    )
  }),
  rest.get('/pizzas', (req, res, ctx) => {
    return res(
      ctx.json([
        {
            "pizza_id": 1,
            "pizza_name": "Pepperoni Pizza",
            "toppings": [
                "Pepperoni",
                "Cheese"
            ],
            "topping_index": [
                0,
                1
            ]
        }
    ])
    )
  }),
  rest.get('/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        {
            "id": 1,
            "name": "Pepperoni"
        },
        {
            "id": 2,
            "name": "Cheese"
        }
    ])
    )
  }),
]