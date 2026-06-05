const express = require("express")
const sqlite3 = require("sqlite3")
const { open } = require("sqlite")
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

let db = null

const initializeDB = async () => {

db = await open({
filename: "tasks.db",
driver: sqlite3.Database
})

await db.exec(`
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  task TEXT,
  isCompleted INTEGER DEFAULT 0
)
`)

app.listen(3000,()=>{
console.log("Server running on http://localhost:3000")
})

}

initializeDB()


//get api
app.get("/tasks", async (req,res)=>{
const tasks = await db.all(`SELECT * FROM tasks`)
res.send(tasks)
})


//add task api
app.post("/tasks", async (req,res)=>{
const {task} = req.body
await db.run(`INSERT INTO tasks (task) VALUES (?)`,[task])
res.send("Task Added")
})

//update task
app.put("/tasks/:id", async (request, response) => {
  const {id} = request.params
  const {isCompleted} = request.body

  const query = `
  UPDATE tasks
  SET isCompleted = ?
  WHERE id = ?
  `

  await db.run(query, [isCompleted, id])

  response.send("Task Updated")
})

//delte api
app.delete("/tasks/:id", async (req,res)=>{
const {id} = req.params
await db.run(`DELETE FROM tasks WHERE id=?`,[id])
res.send("Task Deleted")
})