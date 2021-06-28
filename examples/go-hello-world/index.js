const reproducible = require('../../');

(async () => {
  await reproducible.createImage('build-image');
  await reproducible.runBuild({
    image: 'build-image',
    outputPath: `${process.cwd()}/dist`,
    artifacts: ['main'],
  });
})();
