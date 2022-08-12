const express = require('express')
const path = require('path')
const db = require('../db/connection')
const bodyParser = require('body-parser');

const app = express()
const portNum = 8000

app.use(express.static(path.join(__dirname, '../', 'client', 'dist')))
app.use(express.static(path.join(__dirname, '../', 'client', 'dist', 'assets')))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(portNum, () => {
  console.log(`Listening on port ${portNum}`)
})

app.get('/', (req, res) => {
  res.send()
})

app.get('/toppings', (req, res) => {
  try {
    db.pool.query(
      'SELECT id, name FROM toppings ORDER BY id ASC'
    , (err, result) => {
      if (err) {
        console.log(err)
        res.send('Error retrieving toppings, please try again later.')
      }
      res.send(result.rows)
    })
  }
  catch (error) {
    next(error)
  }
})

app.post('/toppings', (req, res) => {
  try {
    db.pool.query(
      'INSERT INTO toppings(name) VALUES ($1)', [req.body.topping], (err, result) => {
        if (err) {
          res.status(500).send()
        } else {
          res.end()
        }
      }
    )
  }
  catch (error) {
    next(error)
  }
})

app.put('/toppings', (req, res) => {
  console.log(req.body)
  try {
    db.pool.query(
      'UPDATE toppings SET name = ($1) WHERE id = ($2)', [req.body.name, req.body.index], (err, result) => {
        res.end()
      }
    )
  }
  catch (error) {
    next(error)
  }
})

app.delete('/toppings', (req, res) => {
  console.log(req.body.index)
  try {
    db.pool.query(
      'DELETE FROM toppings WHERE id = ($1)', [req.body.index], (err,result) => {
        res.end()
      }
    )
  }
  catch (error) {
    next(error)
  }
})

app.get('/pizzas', (req, res) => {
  try {
    db.pool.query(
      'SELECT pizzas.id AS pizza_id, pizzas.name AS pizza_name, ARRAY_AGG(toppings.name) AS toppings, ARRAY_AGG(toppings.id - 1) AS topping_index FROM pizzas, toppings, recipes WHERE toppings.id = recipes.topping_id AND pizzas.id = recipes.pizza_id GROUP BY pizzas.id;'
    , (err, result) => {
      if (err) {
        console.log(err)
        res.send('Error retrieving pizzas, please try again later.')
      }
      res.send(result.rows)
    })
  }
  catch (error) {
    next(error)
  }
})

app.post('/pizzas', (req, res) => {
  try {
    db.pool.query(
      'INSERT INTO pizzas(name) VALUES ($1) RETURNING id', [req.body.name], (err, results) => {
        if (err) {
          console.log(err)
        } else {
          for (let i = 0; i < req.body.ingredients.length; i++) {
            db.pool.query(
              'INSERT INTO recipes(pizza_id, topping_id) VALUES ($1, $2)', [results.rows[0].id, req.body.ingredients[i]]
            )
          }
        }
      })
      res.end()
  }
  catch (error) {
    next(error)
  }
})

app.put('/pizzas', (req, res) => {
  try {
    db.pool.query(
      'UPDATE pizzas SET name = ($1) WHERE pizzas.id = ($2)', [req.body.pizza_name, req.body.pizza_id], (err, result) => {
        Promise.all(req.body.toppings.map(async (topping, i) => {
          if (topping) {
            db.pool.query(
              'INSERT INTO recipes (pizza_id, topping_id) VALUES (($1), ($2)) ON CONFLICT ON CONSTRAINT unq_pizza DO NOTHING', [req.body.pizza_id, i + 1])
          } else {
            db.pool.query(
              'DELETE FROM recipes WHERE pizza_id = ($1) AND topping_id = ($2)', [req.body.pizza_id, i + 1]
            )
          }
        }))
      }
      )
    }
    catch (error) {
      next(error)
    }
    res.end()
})

app.delete('/pizzas', (req, res) => {
  console.log(req.body)
  console.log(req.body.pizza_id)
  db.pool.query(
    'DELETE FROM pizzas WHERE id = ($1)', [req.body.pizza_id], (err, result) => {
      res.end()
  })
})