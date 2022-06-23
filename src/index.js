// Styles
import './styles/main.scss';

// Assets
import assets from './assets';
assets();

// ==== Mode Switch ====
const newTodoContainer = document.querySelector('[data-new-todo-container]');
const insertBtn = document.querySelector('[data-insert]');
const newTodo = document.querySelector('[data-new-todo]');
const todosSection = document.querySelector('[data-todos-section]');
const todos = document.querySelectorAll('[data-todo]');

// Preferred scheme
if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
    document.body.classList.add('dark');
    newTodoContainer.classList.add('app__new-todo-container--dark');
    insertBtn.classList.add('app__new-todo-insert--dark');
    newTodo.classList.add('app__new-todo--dark');
    todosSection.classList.add('app__todos--dark');
    todos.forEach(todo => {
        todo.classList.add('todo--dark');
    });
}

// ==== Checkboxes ====
const checkboxes = document.querySelectorAll('[data-checkbox]');
const checks = document.querySelectorAll('[data-check]');

checkboxes.forEach((checkbox, index) => {
    const changeOpacity = () =>
        (checks[index].style.opacity = checkbox.checked ? '1' : '0');
    checkbox.addEventListener('change', changeOpacity);
    window.addEventListener('load', changeOpacity);
});
