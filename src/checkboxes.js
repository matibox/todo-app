export default function () {
    const checkboxes = document.querySelectorAll('[data-checkbox]');
    const checks = document.querySelectorAll('[data-check]');

    checkboxes.forEach((checkbox, index) => {
        const changeOpacity = () =>
            (checks[index].style.opacity = checkbox.checked ? '1' : '0');
        checkbox.addEventListener('change', changeOpacity);
        window.addEventListener('load', changeOpacity);
    });
}
