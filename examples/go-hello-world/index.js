const reproducible = require('../../');

(async () => {
  await reproducible.createImage('build-image');
  await reproducible.runBuild({
    image: 'build-image',
    buildPath: '/opt/build',
    outputPath: `${process.cwd()}/dist`,
    artifacts: ['main'],
  });
})();
