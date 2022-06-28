import modeSwitch from './modeSwitch';
import assets from './assets';
import checkboxes from './checkboxes';

export default function app() {
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
            this.texts = document.querySelectorAll('.todo__text');

            this.todos.forEach(todoElement => {
                const todo = new Todo(
                    todoElement.text,
                    false,
                    todoElement.active
                );
                todo.appendTodo();

                this.texts.forEach(text => {
                    if (todo.active) {
                        text.classList.remove('todo__text--completed');
                    } else {
                        text.classList.add('todo__text--completed');
                    }
                });
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
                        <button data-checkbox class="todo__checkbox ${
                            this.active ? '' : 'todo__checkbox--checked'
                        }"></button>
                        <img data-check alt="task done" class="todo__check" style="opacity: ${
                            this.active ? '0' : '1'
                        }">
                    </label>
                </div>
                <p class="todo__text ${
                    this.active ? '' : 'todo__text--completed'
                }">
                    ${this.text}
                </p>
                <img data-remove class="todo__remove" alt="Remove todo">
            `;

            todoElement.setAttribute('data-todo', '');
            todoElement.classList.add('todo');

            todoElement.innerHTML = todoElementBody;
            todosContainer.appendChild(todoElement);

            const checkbox = todoElement.querySelector('[data-checkbox]');

            checkbox.removeEventListener('click', window.checkboxHandler);
            window.checkboxHandler = this.toggleTodo;
            checkbox.addEventListener('click', window.checkboxHandler);

            this.reset();
        }

        toggleTodo(e) {
            let todos = JSON.parse(localStorage.getItem('todos')) || [];
            const checkbox = e.target;
            const todoTextElement =
                checkbox.parentElement.parentElement.nextSibling.nextSibling;
            const todoCheck = checkbox.nextSibling.nextSibling;
            const index = todos.findIndex(
                x => x.text === todoTextElement.innerText
            );

            todos[index].active = !todos[index].active;
            this.active = todos[index].active;

            todoTextElement.classList.toggle('todo__text--completed');

            localStorage.setItem('todos', JSON.stringify([...todos]));
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
