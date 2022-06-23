import iconMoon from './assets/icon-moon.svg';
import iconSun from './assets/icon-sun.svg';
import iconCross from './assets/icon-cross.svg';
import iconCheck from './assets/icon-check.svg';

export default function assets() {
    const assets = [
        { assetName: iconMoon, element: 'moon' },
        { assetName: iconSun, element: 'sun' },
        { assetName: iconCross, element: 'remove' },
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
