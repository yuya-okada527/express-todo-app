const express = require("express");
const app = express();

app.use(express.json())

app.listen(3000);

const todos = [
  {id: 1, title: "Coding", done: 1},
  {id: 2, title: "Test", done: 0}
]

app.get("/", (req, res) => {
  const data = {
    todos: todos
  }
  res.render(`${__dirname}/public/index.ejs`, data);
})

app.post("/todos", (req, res) => {
  console.log(req.body);
  res.send("POST")
})