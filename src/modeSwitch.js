export default function () {
    // Elements
    const modeSwitchBtn = document.querySelector('[data-mode-switch]');

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

    // Add and remove functions
    function addDark() {
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
    }

    function removeDark() {
        document.body.classList.remove('dark');
        newTodoContainer.classList.remove('app__new-todo-container--dark');
        insertBtn.classList.remove('app__new-todo-insert--dark');
        newTodo.classList.remove('app__new-todo--dark');
        todosSection.classList.remove('app__todos--dark');
        info.classList.remove('app__info--dark');
        statusContainer.classList.remove('app__status-container--dark');
        dndInfo.classList.remove('app__dnd-info--dark');
        attribution.classList.remove('attribution--dark');
        todos.forEach(todo => {
            todo.classList.remove('todo--dark');
        });
    }

    // Preferred scheme
    if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches &&
        localStorage.getItem('theme') === null
    ) {
        addDark();
        localStorage.setItem('theme', 'd');
    }

    // Local storage
    let theme = localStorage.getItem('theme') || 'l';

    modeSwitchBtn.addEventListener('click', () => {
        if (theme === 'd') {
            removeDark();
            theme = 'l';
        } else {
            addDark();
            theme = 'd';
        }

        localStorage.setItem('theme', theme);
    });

    if (theme === 'd') addDark();
}
