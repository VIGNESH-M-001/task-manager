
const taskInput = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const taskContainer = document.getElementById("taskContainer")


// Add Task
addBtn.onclick = async function (event) {
  const task = taskInput.value

  if (task === "") {
    alert("Enter a task")
    return
  }

  await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ task: task })
  })

  taskInput.value = ""
  getTasks()
}

// Get All Tasks
async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks")
  const data = await response.json()

  taskContainer.innerHTML = ""

  data.forEach(task => {
    const li = document.createElement("li")

const leftDiv = document.createElement("div")
leftDiv.classList.add("task-left")

const checkbox = document.createElement("input")
checkbox.type = "checkbox"
checkbox.checked = task.isCompleted === 1

checkbox.addEventListener("change", function () {
  updateTask(task.id, this.checked)
})

const span = document.createElement("span")
span.textContent = task.task

if (task.isCompleted === 1) {
  span.style.textDecoration = "line-through";
  span.style.color = "green";
}


const deleteBtn = document.createElement("button")
deleteBtn.textContent = "Delete"
  deleteBtn.classList.add("deletebtn")

leftDiv.appendChild(checkbox)
leftDiv.appendChild(span)

li.appendChild(leftDiv)
li.appendChild(deleteBtn)



deleteBtn.onclick = function () {
      deleteTask(task.id)
    }
taskContainer.appendChild(li)  
  })
}

// Delete Task
async function deleteTask(id) {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "DELETE"
  })

  getTasks()
}

// Update Task Status
async function updateTask(id, status) {
  await fetch(`http://localhost:3000/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      isCompleted: status ? 1 : 0
    })
  })

//   getTasks()
}
getTasks()