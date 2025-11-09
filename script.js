// Получаем элементы со страницы
const taskInput = document.getElementById("Task");
const addTaskBtn = document.getElementById("add_task");
const todoList = document.getElementById("to_do_list");
const allTaskBtn = document.getElementById("all_task");
const completedTaskBtn = document.getElementById("completed_task");
const dontCompletedTaskBtn = document.getElementById("dont_completed_task");

let tasks = [];

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

function showTasks(filter = "all") {
  todoList.innerHTML = "";

  // Фильтруем задачи
  let tasksToShow = tasks;
  if (filter === "completed") {
    tasksToShow = tasks.filter((task) => task.completed);
  } else if (filter === "active") {
    tasksToShow = tasks.filter((task) => !task.completed);
  }

  tasksToShow.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;

    taskElement.innerHTML = `
            <span class="task-text">${task.text}</span>
            <input type="checkbox" class="task-checkbox" ${
              task.completed ? "checked" : ""
            }>
        `;

    const checkbox = taskElement.querySelector(".task-checkbox");
    checkbox.addEventListener("change", function () {
      task.completed = this.checked;
      showTasks();
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
