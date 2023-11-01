const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');
let tasks = [];

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText) {
    const task = {
      text: taskText,
      completed: false,
      timestamp: new Date().toLocaleString(),
    };
    tasks.push(task);
    updateTaskList();
    taskInput.value = '';
  }
}

// Function to update the task list
function updateTaskList() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task');
    if (task.completed) {
      listItem.classList.add('completed');
    }
    listItem.innerHTML = `
      <span>${task.text}</span>
      <span>${task.timestamp}</span>
      <input type="checkbox" data-index="${index}">
      <button data-index="${index}">Delete</button>
    `;
    taskList.appendChild(listItem);
  });
}

// Event listener for the "Add" button
addButton.addEventListener('click', addTask);

// Event listener for checkbox to mark a task as "completed"
taskList.addEventListener('change', (event) => {
  const index = event.target.dataset.index;
  if (event.target.checked) {
    tasks[index].completed = true;
  } else {
    tasks[index].completed = false;
  }
  updateTaskList();
});

// Event listener for the "Delete" button
taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    updateTaskList();
  }
});

