const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const port = 3000;

let tasks = [
  {
    id: 1,
    text: "Go to shop",
  },
  {
    id: 2,
    text: "Buy car",
  },
  {
    id: 3,
    text: "Go for a run",
  },
  {
    id: 4,
    text: "Read a book",
  },
  {
    id: 5,
    text: "Call mom",
  },
];

const checkExist = (task, res) => {
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
};

app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.send("Hello Express");
});

app.get("/tasks", (req, res) => {
  return res.status(200).json(tasks);
});

app.get("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  // Находим задание по полученому ид
  const foundTask = tasks.find((task) => task.id === taskId);

  checkExist(foundTask, res);

  return res.status(200).json(foundTask);
});

app.post("/tasks", (req, res) => {
  //получаю данные из тела запроса
  const newTask = req.body;

  //Выполняем операцию создания
  tasks.push(newTask);

  //Отвечаем ответом про успех или оздание задачи
  return res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  // Получаем данные из тела запроса
  const updatetTask = req.body;
  const taskId = parseInt(req.params.id);

  // Находим задание по полученому ид
  const foundTask = tasks.find((task) => task.id === taskId);

  checkExist(foundTask, res);
  foundTask.text = updatetTask.text;

  return res.status(200).json(foundTask);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.filter((t) => t.id !== taskId);

  return res.status(204).json(tasks);
});

app.listen(port, () => {
  console.log("Server start on http://localhost:" + port);
});
