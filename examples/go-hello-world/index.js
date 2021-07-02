const path = require('path');
const fs = require('fs');
const reproducible = require('../../');

(async () => {
  // Generate a DockerFile for Build Pipeline
  reproducible.generateDockerfile('golang:buster', './', 'go build -o ./dist/main src/main.go');

  // Build artifacts using docker build process and export as image
  await reproducible.createBuild('valist-build-image');

  // Export build artifacts from image
  await reproducible.exportBuild({
    image: 'valist-build-image',
    out: `dist`,
  });
})();
