// Backgrounds
import bgDD from './assets/bg-desktop-dark.jpg';
import bgDL from './assets/bg-desktop-light.jpg';
import bgMD from './assets/bg-mobile-dark.jpg';
import bgML from './assets/bg-mobile-light.jpg';

// Icons
import iconMoon from './assets/icon-moon.svg';
import iconSun from './assets/icon-sun.svg';
import iconCross from './assets/icon-cross.svg';
import iconCheck from './assets/icon-check.svg';

export default function assets() {
    const assets = [
        { assetName: iconMoon, element: 'moon' },
        { assetName: iconSun, element: 'sun' },
        { assetName: iconCross, element: 'remove' },
        { assetName: iconCheck, element: 'check' },
        { assetName: bgDD, element: 'bg-d-d' },
        { assetName: bgDL, element: 'bg-d-l' },
        { assetName: bgMD, element: 'bg-m-d' },
        { assetName: bgML, element: 'bg-m-l' },
    ];

    function setAssetsSource(assets) {
        assets.forEach(asset => {
            const elements = document.querySelectorAll(
                `[data-${asset.element}]`
            );
            elements.forEach(element => (element.src = asset.assetName));
        });
    }

    const modeSwitchBtn = document.querySelector('[data-mode-switch]');

    // Background change
    window.addEventListener('load', bgChangeHandler);
    window.addEventListener('resize', bgChangeHandler);
    modeSwitchBtn.addEventListener('click', bgChangeHandler);

    // Icon change
    window.addEventListener('load', iconChangeHandler);
    modeSwitchBtn.addEventListener('click', iconChangeHandler);

    function bgChangeHandler() {
        let theme = localStorage.getItem('theme') || 'l';
        const attributes = assets.filter(asset => {
            if (asset.element.startsWith('bg')) return true;
        });
        const dataAttributes = [];
        for (let i = 0; i < attributes.length; i++) {
            dataAttributes.push(attributes[i].element);
        }

        changeBg(theme, dataAttributes);
    }

    function iconChangeHandler() {
        let theme = localStorage.getItem('theme') || 'l';
        const attributes = assets.filter(asset => {
            if (asset.element === 'sun' || asset.element === 'moon')
                return true;
        });
        const dataAttributes = [];
        for (let i = 0; i < attributes.length; i++) {
            dataAttributes.push(attributes[i].element);
        }

        changeIcon(theme, dataAttributes);
    }

    function changeBg(mode, dataAttributes) {
        const background = document.querySelector('[data-background]');
        const device = window.innerWidth > 750 ? 'd' : 'm';
        const attribute = `data-bg-${device}-${mode}`;

        removeAttributes(background, dataAttributes);
        background.setAttribute(attribute, '');
        setAssetsSource(assets);
    }

    function changeIcon(mode, dataAttributes) {
        const icon = mode === 'l' ? 'moon' : 'sun';
        const attribute = `data-${icon}`;
        removeAttributes(modeSwitchBtn, dataAttributes);
        modeSwitchBtn.setAttribute(attribute, '');
        setAssetsSource(assets);
    }

    function removeAttributes(element, attributes) {
        attributes.forEach(attribute => {
            element.removeAttribute(`data-${attribute}`);
        });
    }

    setAssetsSource(assets);
}
