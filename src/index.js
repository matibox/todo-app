// Font awesome
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

// Styles
import './styles/main.scss';

// Assets
import assets from './assets';
assets();

// ==== Mode Switch ====
// Preferred scheme
if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
) {
    document.body.classList.add('dark');
}
