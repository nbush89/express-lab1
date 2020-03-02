const express = require("express");
const cartRoutes = express.Router();

const cart = [
  {
    id: 0,
    product: "shoe",
    price: 5,
    quantity: 19
  },
  {
    id: 1,
    product: "pan",
    price: 20,
    quantity: 2
  },
  {
    id: 2,
    product: "hat",
    price: 12,
    quantity: 9
  },
  {
    id: 3,
    product: "phone",
    price: 500,
    quantity: 5
  },
  {
    id: 4,
    product: "car",
    price: 5000,
    quantity: 1
  }
];
let nextId = 5;
cartRoutes.get("/cart", (request, response) => {
  response.json(cart);
  response.status(200);
});
cartRoutes.get("/cart/:id", (request, response) => {
  let id = parseInt(request.params.id);
  let foundItem = cart.find(item => id === item.id);
  if (foundItem) {
    response.json(foundItem);
    response.status(200);
  } else {
    response.status(404);
    response.send(`No item by id: ${id}`);
  }
});
cartRoutes.post("/cart", (request, response) => {
  let newItem = request.body;
  newItem.id = nextId;
  nextId++;
  cart.push(newItem);
  response.status(201);
  response.json(cart);
});
cartRoutes.put("/cart/:id", (request, response) => {
  let id = parseInt(request.params.id);
  let updatedCart = request.body;
  updatedCart.id = nextId;
  let index = cart.findIndex(item => id === item.id);
  if (index > -1) {
    cart.splice(index, 1, updatedCart);
    nextId++;
    response.json(cart);
    response.status(200);
  } else {
    response.status(404);
    response.send(`There is no food by id: ${id}`);
  }
});
cartRoutes.delete("/cart/:id", (request, response) => {
  let id = parseInt(request.params.id);
  let index = cart.findIndex(item => id === item.id);
  if (index > -1) {
    cart.splice(index, 1);
    response.sendStatus(204);
  } else {
    response.status(404);
    response.send(`There is no food by id: ${id}`);
  }
});
module.exports = cartRoutes;
