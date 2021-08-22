const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config()
const app = express();
const MongoClient = mongodb.MongoClient;

app.use(express.json())

app.listen(process.env.SERVER_PORT || 3000);

const MONGO_URL = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`

app.get("/", (req, res) => {
  MongoClient.connect(MONGO_URL, (err, client) => {
    const db = client.db("todo_db");
    db.collection("todos").find().toArray((err, docs) => {
      if (!docs) {
        return;
      }
      let todos = []
      for (const doc of docs) {
        todos.push({
          id: doc._id,
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
    const db = client.db("todo_db");
    const todo = {
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
    const db = client.db("todo_db");
    db.collection("todos").updateOne(
      { _id: mongodb.ObjectId(req.body.id) },
      { $set: { done: Number.parseInt(req.body.done) }},
      (err, result) => {
        res.send("success")
      }
    )
  })
})

app.delete("/todos", (req, res) => {
  console.log(req.body.id)
  MongoClient.connect(MONGO_URL, (err, client) => {
    const db = client.db("todo_db");
    db.collection("todos").deleteOne(
      { _id: mongodb.ObjectId(req.body.id) },
      (err, result) => {
        res.send("success")
      }
    )
  })
})