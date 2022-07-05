import modeSwitch from './modeSwitch';
import assets from './assets';

export default function app() {
    const newTodo = document.querySelector('[data-new-todo]');
    const addTodo = document.querySelector('[data-insert]');
    const todosContainer = document.querySelector('[data-todo-container]');
    const clearCompleted = document.querySelector('[data-clear]');
    const filterAll = document.querySelector('[data-filter-all]');
    const filterActive = document.querySelector('[data-filter-active]');
    const filterCompleted = document.querySelector('[data-filter-completed]');
    const itemsLeft = document.querySelector('[data-items-left]');

    const getTodos = () => JSON.parse(localStorage.getItem('todos')) || [];
    const getStatus = () => localStorage.getItem('status');

    class App {
        constructor() {
            clearCompleted.addEventListener('click', this.clearAllTodos);
            filterAll.addEventListener('click', this.filterAll);
            filterActive.addEventListener('click', this.filterActive);
            filterCompleted.addEventListener('click', this.filterCompleted);
            localStorage.setItem(
                'status',
                localStorage.getItem('status') || 'all'
            );
            let status = getStatus();
            this.setTogglers(document.querySelector(`[data-filter-${status}]`));
        }

        load() {
            this.todos = getTodos();
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

            this.updateCounter();
        }

        handleClick() {
            let todos = getTodos();
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].text === newTodo.value) return;
            }
            if (newTodo.value === '') return;
            this.addTodo(newTodo.value);
        }

        handleEnterPress(e) {
            let todos = getTodos();
            for (let i = 0; i < todos.length; i++) {
                if (todos[i].text === newTodo.value) return;
            }
            if (e.key !== 'Enter' || newTodo.value === '') return;
            this.addTodo(newTodo.value);
        }

        addTodo(text) {
            const todo = new Todo(text, true);
            this.todos.push(todo);
            todo.appendTodo();
            this.updateCounter();
        }

        clearAllTodos() {
            let todos = JSON.parse(localStorage.getItem('todos') || []);
            const completedTodos = todos.filter(todo => !todo.active);

            const elementTodos = document.querySelectorAll('[data-todo]');
            const completedElementTodos = [...elementTodos].filter(todo => {
                const checkbox = todo.querySelector('[data-checkbox]');
                return checkbox.classList.contains('todo__checkbox--checked');
            });

            completedElementTodos.forEach(todo => todo.remove());

            todos = todos.filter(todo => !completedTodos.includes(todo));
            localStorage.setItem('todos', JSON.stringify([...todos]) || '[]');
            app.updateCounter();
        }

        setTogglers(activeToggler) {
            const statusTogglers = document.querySelectorAll('.app__status');
            statusTogglers.forEach(toggler => {
                toggler.classList.remove('app__status--active');
            });

            activeToggler.classList.add('app__status--active');
        }

        setStatus(status) {
            localStorage.setItem('status', status);
        }

        filterAll() {
            const elementTodos = document.querySelectorAll('[data-todo]');
            elementTodos.forEach(todo => {
                todo.classList.add('todo--active');
            });
            app.setTogglers(this);
            app.setStatus('all');
        }

        filterActive() {
            const elementTodos = document.querySelectorAll('[data-todo]');

            const inactiveTodos = [...elementTodos].filter(todo => {
                const checkbox = todo.querySelector('[data-checkbox]');
                return checkbox.classList.contains('todo__checkbox--checked');
            });
            const activeTodos = [...elementTodos].filter(
                todo => !inactiveTodos.includes(todo)
            );

            activeTodos.forEach(todo => {
                todo.classList.add('todo--active');
            });

            inactiveTodos.forEach(todo => {
                todo.classList.remove('todo--active');
            });

            app.setTogglers(this);
            app.setStatus('active');
        }

        filterCompleted() {
            const elementTodos = document.querySelectorAll('[data-todo]');

            const inactiveTodos = [...elementTodos].filter(todo => {
                const checkbox = todo.querySelector('[data-checkbox]');
                return checkbox.classList.contains('todo__checkbox--checked');
            });
            const activeTodos = [...elementTodos].filter(
                todo => !inactiveTodos.includes(todo)
            );

            activeTodos.forEach(todo => {
                todo.classList.remove('todo--active');
            });

            inactiveTodos.forEach(todo => {
                todo.classList.add('todo--active');
            });

            app.setTogglers(this);
            app.setStatus('completed');
        }

        updateCounter() {
            let todos = JSON.parse(localStorage.getItem('todos') || []);
            const activeTodos = todos.filter(todo => todo.active);
            itemsLeft.innerText = activeTodos.length;
        }
    }

    class Todo {
        constructor(text, addToStorage, active = true) {
            this.text = text;
            this.addToStorage = addToStorage;
            this.active = active;
        }

        appendTodo() {
            let currentStatus = getStatus();

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

            if (
                currentStatus === 'all' ||
                (currentStatus === 'active' && this.active) ||
                (currentStatus === 'completed' && !this.active)
            ) {
                todoElement.classList.add('todo--active');
            }

            todoElement.innerHTML = todoElementBody;
            todosContainer.appendChild(todoElement);

            const checkbox = todoElement.querySelector('[data-checkbox]');
            const remove = todoElement.querySelector('[data-remove]');

            checkbox.removeEventListener('click', window.checkboxHandler);
            window.checkboxHandler = this.toggleTodo;
            checkbox.addEventListener('click', window.checkboxHandler);

            remove.removeEventListener('click', window.removeHandler);
            window.removeHandler = this.removeTodo;
            remove.addEventListener('click', window.removeHandler);

            this.reset();
        }

        toggleTodo(e) {
            let todos = getTodos();
            const checkbox = e.target;
            const check = checkbox.nextSibling.nextSibling;
            const todoTextElement =
                checkbox.parentElement.parentElement.nextSibling.nextSibling;
            const index = todos.findIndex(
                x => x.text === todoTextElement.innerText
            );

            todos[index].active = !todos[index].active;
            this.active = todos[index].active;

            todoTextElement.classList.toggle('todo__text--completed');

            checkbox.classList.toggle('todo__checkbox--checked');
            check.style.opacity = checkbox.classList.contains(
                'todo__checkbox--checked'
            )
                ? '1'
                : '0';

            localStorage.setItem('todos', JSON.stringify([...todos]));
            app.updateCounter();
        }

        removeTodo(e) {
            let todos = getTodos();
            const remove = e.target;
            const todoTextElement = remove.parentElement;
            const index = todos.findIndex(
                x => x.text === todoTextElement.innerText
            );

            todos.splice(index, 1);
            todoTextElement.remove();

            localStorage.setItem('todos', JSON.stringify([...todos]));
            app.updateCounter();
        }

        reset() {
            newTodo.value = '';
            modeSwitch();
            assets();
        }
    }

    const app = new App();
    window.addEventListener('load', app.load.bind(app));
    addTodo.addEventListener('click', app.handleClick.bind(app));
    window.addEventListener('keyup', app.handleEnterPress.bind(app));
}
