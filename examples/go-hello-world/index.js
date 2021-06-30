const path = require('path');
const fs = require('fs');
const reproducible = require('../../');

(async () => {
  await reproducible.createImage('valist-build-image');
  await reproducible.runBuild({
    image: 'valist-build-image',
    outputPath: path.join(process.cwd(), '/dist/'),
    artifacts: ['main'],
  });

  const releaseFile = fs.createReadStream(path.join(process.cwd(), '/dist/main'));
  console.log('Artifact Path:', releaseFile.path);
})();
