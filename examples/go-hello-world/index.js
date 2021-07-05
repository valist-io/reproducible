const reproducible = require('../../');

(async () => {
  await reproducible.generateDockerfile('golang:buster', './', 'go build -o ./dist/main src/main.go');
  await reproducible.createBuild('valist-build');
  await reproducible.exportBuild('valist-build', 'dist/main');
})();
