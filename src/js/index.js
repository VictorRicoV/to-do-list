// El styles lo importamos aquí para que se encargue Vite de compilar todo
import '../scss/styles.scss';

const formElement = document.getElementById('form');
const inputTaskElement = document.getElementById('input-task');
const taskElement = document.getElementById('task');
const itemLeftElement = document.getElementById('item-left');
const deleteElement = document.getElementById('delete-completed');
const filtersElement = document.getElementById('filters');

const tasks = [
  {
    id: Date.now(),
    task: 'Comprar el pan',
    completed: false
  }
];

const addTask = event => {
  //crear una tarea nueva y añadirla al array
  event.preventDefault();
  const newTask = {
    id: Date.now(),
    task: inputTaskElement.value,
    completed: false
  };
  tasks.push(newTask);
  console.log(tasks);
};

formElement.addEventListener('submit', addTask);
