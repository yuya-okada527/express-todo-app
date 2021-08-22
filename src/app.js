const express = require("express");
const mongodb = require("mongodb");
const app = express();
const MongoClient = mongodb.MongoClient;

app.use(express.json())

app.listen(3000);

const MONGO_URL = "mongodb://root:example@localhost:27017"

app.get("/", (req, res) => {
  let todos = []
  MongoClient.connect(MONGO_URL, (err, client) => {
    const db = client.db("db");
    db.collection("todos").find().toArray((err, docs) => {
      if (!docs) {
        return;
      }
      for (const doc of docs) {
        todos.push({
          id: doc.id,
          title: doc.title,
          done: doc.done
        });
      }
      const data = {
        todos: todos
      }
      res.render(`${__dirname}/public/index.ejs`, data);
    })
  })
})

app.post("/todos", (req, res) => {
  MongoClient.connect(MONGO_URL, async (err, client) => {
    const db = client.db("db");
    const count = await db.collection("todos").find().count();
    const todo = {
      id: count + 1,
      title: req.body.title,
      done: 0
    }
    db.collection("todos").insertOne(todo, (err, result) => {
      res.send("success")
    })
  })
})

app.put("/todos", (req, res) => {
  console.log(req.body.id)
  MongoClient.connect(MONGO_URL, (err, client) => {
    const db = client.db("db");
    db.collection("todos").find({id: Number.parseInt(req.body.id)}).toArray((err, result) => console.log(result))
    db.collection("todos").updateOne(
      { id: Number.parseInt(req.body.id)},
      { $set: { done: Number.parseInt(req.body.done) }},
      (err, result) => {
        console.log(result);
        res.send("success")
      }
    )
  })
})