// DEFINE UI VARS
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBTN = document.querySelector('clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// LOAD ALL EVENT LISTENERS
loadEventListeners();

function loadEventListeners() {
  form.addEventListener('submit', addTask);
}
// ADD TASK
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a Task');
  }
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

  taskInput.value = '';

  e.preventDefault();
}
