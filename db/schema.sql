\c pizzashack
DROP TABLE IF EXISTS pizzas CASCADE;
DROP TABLE IF EXISTS toppings CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;

CREATE TABLE toppings(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE pizzas(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE recipes(
  id SERIAL PRIMARY KEY,
  pizza_id INT NOT NULL,
  topping_id INT NOT NULL,
  CONSTRAINT fk_pizza_id
    FOREIGN KEY(pizza_id)
      REFERENCES pizzas(id)
        ON DELETE CASCADE,
  CONSTRAINT fk_topping_id
    FOREIGN KEY(topping_id)
      REFERENCES toppings(id)
        ON DELETE CASCADE,
  CONSTRAINT unq_pizza
    UNIQUE (pizza_id, topping_id)
);

INSERT INTO toppings(name) VALUES('Pepperoni');
INSERT INTO toppings(name) VALUES('Cheese');

INSERT INTO pizzas(name) VALUES('Pepperoni Pizza');

INSERT INTO recipes(pizza_id, topping_id) VALUES(1, 1);
INSERT INTO recipes(pizza_id, topping_id) VALUES(1, 2);