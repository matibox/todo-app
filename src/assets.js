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

    setAssetsSource(assets);
}
