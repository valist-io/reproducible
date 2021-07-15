const reproducible = require('../../');

(async () => {
  await reproducible.createBuild('valist-go-ipfs');
  await reproducible.exportBuild('valist-go-ipfs', 'dist');
})();
