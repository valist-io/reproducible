const reproducible = require('../');

(async () => {
  await reproducible.createImage();
  await reproducible.createBuildEnv({
    image: 'valist-build',
    command: ['cp', '/opt/valist/go-ipfs/cmd/ipfs/ipfs', '/opt/valist/dist'],
    source: `${process.cwd()}/dist`,
  });
})();
