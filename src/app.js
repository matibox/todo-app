/*import modeSwitch from './modeSwitch';
import assets from './assets';
import checkboxes from './checkboxes';

export default function () {
    const newTodo = document.querySelector('[data-new-todo]');
    const addTodo = document.querySelector('[data-insert]');
    const todosContainer = document.querySelector('[data-todo-container]');
    const clearCompleted = document.querySelector('[data-clear]');
    const filterAll = document.querySelector('[data-filter-all]');
    const filterActive = document.querySelector('[data-filter-active]');
    const filterCompleted = document.querySelector('[data-filter-completed]');

    class App {
        load() {
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
            this.todos.forEach(todoElement => {
                const todo = new Todo(
                    todoElement.text,
                    false,
                    todoElement.active
                );
                todo.appendTodo();
            });
        }

        handleClick() {
            if (newTodo.value === '') return;
            this.addTodo(newTodo.value);
        }

        handleEnterPress(e) {
            if (e.key !== 'Enter' || newTodo.value === '') return;
            this.addTodo(newTodo.value);
        }

        addTodo(text) {
            const todo = new Todo(text, true);
            this.todos.push(todo);
            todo.appendTodo();
        }
    }

    class Todo {
        constructor(text, addToStorage, active = true) {
            this.text = text;
            this.addToStorage = addToStorage;
            this.active = active;
        }

        appendTodo() {
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            todos.forEach(todo => {
                if (todo.text === newTodo.value) return;
            });

            if (this.addToStorage) {
                localStorage.setItem(
                    'todos',
                    JSON.stringify([
                        ...JSON.parse(localStorage.getItem('todos') || '[]'),
                        { text: this.text, active: this.active },
                    ])
                );
            }

            const todoElement = document.createElement('div');
            const todoElementBody = `
                <div class="todo__input-container">
                    <label>
                        <input data-checkbox type="checkbox" class="todo__checkbox">
                        <img data-check alt="task done" class="todo__check">
                    </label>
                </div>
                <p class="todo__text">
                    ${this.text}
                </p>
                <img data-remove class="todo__remove" alt="Remove todo">
            `;

            todoElement.setAttribute('data-todo', '');
            todoElement.classList.add('todo');

            todoElement.innerHTML = todoElementBody;
            todosContainer.appendChild(todoElement);
            this.reset();
        }

        reset() {
            newTodo.value = '';
            modeSwitch();
            assets();
            checkboxes();
        }
    }

    const app = new App();
    window.addEventListener('load', app.load.bind(app));
    addTodo.addEventListener('click', app.handleClick.bind(app));
    window.addEventListener('keyup', app.handleEnterPress.bind(app));
}
*/
