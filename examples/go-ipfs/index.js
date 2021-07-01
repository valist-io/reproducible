const reproducible = require('../../');

(async () => {
  // Build artifacts using docker build process and export as image
  await reproducible.createBuild('valist-go-ipfs');

  // Export build artifacts from image
  await reproducible.exportBuild({
    image: 'valist-go-ipfs',
    out: `dist`,
  });
})();
