export default function () {
    const checkboxes = document.querySelectorAll('[data-checkbox]');
    const checks = document.querySelectorAll('[data-check]');

    checkboxes.forEach((checkbox, index) => {
        const toggleCheckboxes = () => {
            checkbox.classList.toggle('todo__checkbox--checked');
            checks[index].style.opacity = checkbox.classList.contains(
                'todo__checkbox--checked'
            )
                ? '1'
                : '0';
        };

        checkbox.addEventListener('click', toggleCheckboxes);
    });
}
