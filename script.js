const taskInput = document.getElementById("Task");
const addTaskBtn = document.getElementById("add_task");
const todoList = document.getElementById("to_do_list");
const allTaskBtn = document.getElementById("all_task");
const completedTaskBtn = document.getElementById("completed_task");
const dontCompletedTaskBtn = document.getElementById("dont_completed_task");

let tasks = [];
let editingTaskId = null;

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Пожалуйста, введите задачу!");
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
  };

  tasks.push(newTask);

  taskInput.value = "";

  showTasks();
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const taskElement = document.querySelector(`.task[data-id="${id}"]`);
  const taskTextElement = taskElement.querySelector(".task-text");

  const input = document.createElement("input");
  input.type = "text";
  input.value = task.text;
  input.className = "edit-input";

  taskTextElement.replaceWith(input);
  input.focus();

  editingTaskId = id;

  input.addEventListener("blur", function () {
    saveEdit(id, input.value);
  });
}

function saveEdit(id, newText) {
  if (editingTaskId !== id) return;

  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  const trimmedText = newText.trim();
  if (trimmedText !== "") {
    task.text = trimmedText;
  }

  editingTaskId = null;
  showTasks();
}

function showTasks(filter = "all") {
  todoList.innerHTML = "";

  let tasksToShow = tasks;
  if (filter === "completed") {
    tasksToShow = tasks.filter((task) => task.completed);
  } else if (filter === "active") {
    tasksToShow = tasks.filter((task) => !task.completed);
  }

  tasksToShow.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;
    taskElement.setAttribute("data-id", task.id);

    taskElement.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${
        task.completed ? "checked" : ""
      }>
      <div class="task-buttons">
        <button class="edit-btn">✍️</button>
      </div>
      <span class="task-text">${task.text}</span>
    `;

    const checkbox = taskElement.querySelector(".task-checkbox");
    checkbox.addEventListener("change", function () {
      task.completed = this.checked;
      showTasks();
    });

    const editBtn = taskElement.querySelector(".edit-btn");
    editBtn.addEventListener("click", function () {
      editTask(task.id);
    });

    todoList.appendChild(taskElement);
  });
}

function showAllTasks() {
  showTasks("all");
}

function showCompletedTasks() {
  showTasks("completed");
}

function showActiveTasks() {
  showTasks("active");
}

addTaskBtn.addEventListener("click", addTask);

allTaskBtn.addEventListener("click", showAllTasks);
completedTaskBtn.addEventListener("click", showCompletedTasks);
dontCompletedTaskBtn.addEventListener("click", showActiveTasks);

showTasks();
