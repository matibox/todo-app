export default function () {
    const newTodo = document.querySelector('[data-new-todo]');
    const addTodo = document.querySelector('[data-insert]');
    const todosContainer = document.querySelector('[data-todo-container]');
    const clearCompleted = document.querySelector('[data-clear]');
    const filterAll = document.querySelector('[data-filter-all]');
    const filterActive = document.querySelector('[data-filter-active]');
    const filterCompleted = document.querySelector('[data-filter-completed]');

    class App {
        constructor() {
            this.todos = [];
        }

        handleClick() {
            if (newTodo.value === '') return;
            console.log('clicked');
        }

        handleEnterPress(e) {
            if (e.key !== 'Enter' || newTodo.value === '') return;
            console.log('enter pressed');
        }
    }

    const app = new App();
    addTodo.addEventListener('click', app.handleClick.bind(app));
    window.addEventListener('keyup', app.handleEnterPress.bind(app));
}
