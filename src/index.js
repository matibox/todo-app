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
