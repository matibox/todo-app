export default function () {
    // ==== Mode Switch ====
    const newTodoContainer = document.querySelector(
        '[data-new-todo-container]'
    );
    const insertBtn = document.querySelector('[data-insert]');
    const newTodo = document.querySelector('[data-new-todo]');
    const todosSection = document.querySelector('[data-todos-section]');
    const todos = document.querySelectorAll('[data-todo]');
    const info = document.querySelector('[data-info]');
    const statusContainer = document.querySelector('[data-status-container]');
    const dndInfo = document.querySelector('[data-dnd-info]');
    const attribution = document.querySelector('.attribution');

    let mode = 'l';

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
        info.classList.add('app__info--dark');
        statusContainer.classList.add('app__status-container--dark');
        dndInfo.classList.add('app__dnd-info--dark');
        attribution.classList.add('attribution--dark');
        todos.forEach(todo => {
            todo.classList.add('todo--dark');
        });
        mode = 'd';
        return mode;
    }
}
