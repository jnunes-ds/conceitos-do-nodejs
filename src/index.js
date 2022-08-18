const express = require("express");
const cors = require("cors");
const { v4: uuidV4 } = require("uuid");

// const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.body;

  const USER = users.find((user) => user.username === username);

  if (USER) return response.status(400).json({ error: "User already exists" });

  request.user = USER;

  return next();
}

app.post("/users", checksExistsUserAccount, (request, response) => {
  const { name, username } = request.body;

  const newUser = {
    id: uuidV4(),
    name,
    username,
    todos: [],
  };

  users.push(newUser);

  return response.status(201).json(newUser);
});

app.get("/todos", checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;

  const user = users.find((item) => item.username === username);

  return response.status(200).json({ todos: user.todos });
});

app.post("/todos", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch("/todos/:id/done", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete("/todos/:id", checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;
