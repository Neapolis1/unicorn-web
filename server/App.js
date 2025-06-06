const express = require("express");
const app = express();
const port = 8888;

const cors = require("cors");

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const taskController = require("./controller/task")
const categoryController = require("./controller/category")

app.use("/task", taskController)
app.use("/category", categoryController)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})