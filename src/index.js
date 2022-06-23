// Styles
import './styles/main.scss';

// Assets
import assets from './assets';
assets();

// ==== Mode Switch ====
const header = document.querySelector('[data-header]');
const newTodoContainer = document.querySelector('[data-new-todo-container]');
const insertBtn = document.querySelector('[data-insert]');
const newTodo = document.querySelector('[data-new-todo]');

// Preferred scheme
if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
    document.body.classList.add('dark');
    header.classList.add('app__header--dark');
    newTodoContainer.classList.add('app__new-todo-container--dark');
    insertBtn.classList.add('app__new-todo-insert--dark');
    newTodo.classList.add('app__new-todo--dark');
}
