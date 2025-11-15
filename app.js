// app.js

// DOM elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// load tasks on start
window.addEventListener('load', loadTasks);
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

function getTasks() {
  return JSON.parse(localStorage.getItem('todo')) || [];
}

function saveTasks(tasks) {
  localStorage.setItem('todo', JSON.stringify(tasks));
}

function addTask() {
  const task = taskInput.value.trim();
  if (!task) {
    alert('Task එක හිස් නැතුව දාන්න!');
    return;
  }
  const tasks = getTasks();
  tasks.push(task);
  saveTasks(tasks);
  taskInput.value = '';
  loadTasks();
}

function delTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  loadTasks();
}

function loadTasks() {
  taskList.innerHTML = '';
  const tasks = getTasks();
  tasks.forEach((t, i) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = t;
    const btn = document.createElement('button');
    btn.textContent = 'X';
    btn.className = 'delBtn';
    btn.addEventListener('click', () => delTask(i));
    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  });
}
