// DEFINE UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBTN = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // ADD TASK EVENT
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  //   CLEAR TASK EVENT
  clearBTN.addEventListener('click', clearTasks);
  //   FILTER THROUGH TASKS
  filter.addEventListener('keyup', filterTasks);
}

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task) {
    //   CREAT LI ELEMENT
    const li = document.createElement('li');
    //   ADD CLASS FOR MATERIALIZE STYLING
    li.className = 'collection-item';
    //   CREATE TEXT NODE AND APPEND TO LI
    li.appendChild(document.createTextNode(task));
    // CREATE NEW LINK ELEMENT
    const link = document.createElement('a');
    // ADD CLASS
    link.className = 'delete-item secondary-content';
    // ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // APPEND LINK TO LI
    li.appendChild(link);

    //   APPEND LI TO UL
    taskList.appendChild(li);
  });
}

// ADD TASK
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  } else {
    //   CREAT LI ELEMENT
    const li = document.createElement('li');
    //   ADD CLASS FOR MATERIALIZE STYLING
    li.className = 'collection-item';
    //   CREATE TEXT NODE AND APPEND TO LI
    li.appendChild(document.createTextNode(taskInput.value));
    // CREATE NEW LINK ELEMENT
    const link = document.createElement('a');
    // ADD CLASS
    link.className = 'delete-item secondary-content';
    // ADD ICON HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // APPEND LINK TO LI
    li.appendChild(link);

    //   APPEND LI TO UL
    taskList.appendChild(li);

    // STORE IN LOCAL STORAGE
    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
  }
}

// STORE TASK
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //   REMOVE FROM LOCAL STORAGE
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// CLEAR TASK LIST, EITHER OF THE FOLLOWING FUNCTION WORKS, BUT THAT LATTER RUNS FASTER

// function clearTasks() {
//   taskList.innerHTML = '';
// }

function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //   CLEAR FROM LOCAL STORAGE
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// FILTER TASK LIST
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.getElementsByClassName.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
