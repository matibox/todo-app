export default function assets() {
    const assets = [{ assetName: 'a', element: 'a' }];

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
