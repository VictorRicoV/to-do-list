// El styles lo importamos aquí para que se encargue Vite de compilar todo
import '../scss/styles.scss';

const formElement = document.getElementById('form');
const inputTaskElement = document.getElementById('input-task');
const tasksElement = document.getElementById('tasks');
const itemLeftElement = document.getElementById('item-left');
const deleteElement = document.getElementById('delete-completed');
const filtersElement = document.getElementById('filters');

let tasks = [
  {
    id: Date.now(),
    task: 'Comprar el pan',
    completed: false
  }
];

const counterTask = () => {
  const incompleteTasks = tasks.filter(task => !task.completed).length;
  itemLeftElement.textContent = `${incompleteTasks} items left`;
};

const clearCompleted = () => {
  tasks = tasks.filter(task => !task.completed);
  insertTasks();
};

counterTask();
const insertTasks = () => {
  const fragment = document.createDocumentFragment();
  tasks.forEach(todo => {
    const newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('task-container');
    const newTaskCheck = document.createElement('input');
    newTaskCheck.id = todo.id;
    newTaskCheck.classList.add('task-check');
    newTaskCheck.type = 'checkbox';
    newTaskCheck.checked = todo.completed;
    newTaskCheck.addEventListener('change', () => completedTask(todo.id));

    const newTaskText = document.createElement('label');
    newTaskText.classList.add('task-text');
    newTaskText.textContent = todo.task;
    newTaskText.htmlFor = todo.id;
    const newTaskDelete = document.createElement('img');
    newTaskDelete.classList.add('task-delete');
    newTaskDelete.src = './assets/images/icon-cross.svg';
    newTaskContainer.append(newTaskCheck, newTaskText, newTaskDelete);
    fragment.append(newTaskContainer);
    newTaskDelete.addEventListener('click', () => deleteTask(todo.id));
  });
  tasksElement.textContent = '';
  tasksElement.append(fragment);
  counterTask();
};

insertTasks();

const deleteTask = id => {
  tasks = tasks.filter(task => {
    return task.id !== id;
  });
  insertTasks();
};

const completedTask = id => {
  tasks = tasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  insertTasks();
};

const addTask = () => {
  //crear una tarea nueva y añadirla al array
  const newTask = {
    id: Date.now(),
    task: inputTaskElement.value,
    completed: false
  };
  tasks.push(newTask);

  insertTasks();
};

formElement.addEventListener('submit', event => {
  event.preventDefault();
  if (!inputTaskElement.value) {
    return;
  }
  addTask();
  event.target.reset();
});

deleteElement.addEventListener('click', clearCompleted);
