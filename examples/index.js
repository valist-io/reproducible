const reproducible = require('../');

(async () => {
  await reproducible.createImage();
  await reproducible.createBuildEnv({
    image: 'valist-build',
    command: ['cp', 'build/bin/geth', '/opt/valist/dist'],
    source: `${process.cwd()}/dist`,
  });
})();
