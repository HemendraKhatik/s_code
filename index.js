const express = require("express");
const app = express();
const port = 8081;

// Bellow two lines are necessary for reading req.body data
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

let todos = [];

const user = {
  name: "hemendra",
  email: "sendtohemu@gmail.com",
};

// Create
app.post("/addTodo", (req, res) => {

  const todo = {
    id: Math.ceil(Math.random() * 1000000000),
    todo: req.body.todo
  };
  todos.push(todo);

  const response = {
    message: "Todo added successfully",
    todo: todo,
  };
  res.send(response);
});

// Read
app.get("/getTodos", (req, res) => {
  const response = {
    message: "Todos fetched successfully",
    todos: todos,
    user: user,
  };
  res.send(response);
});

// Delete
app.delete("/deleteTodo", (req, res) => {
    todos = todos.filter(todo=>todo.id !== req.body.id)
    res.send("todo deleted successfully");
});

// update
app.patch("/updateTodo", (req, res) => {
    todos = todos.map(todo=>{
      if(todo.id === req.body.id){
        const obj = {
            id:todo.id,
            todo:req.body.updatedTodo
        }
        return obj
      }
      return todo
    })
    res.send("todo update successfully");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});