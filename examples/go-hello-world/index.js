const path = require('path');

const buildImage = async () => new Promise((resolve, reject) => {
  const spawn = require('child_process').spawn,
  build = spawn('docker build -t valist-build-image .', { shell: true });

  build.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  build.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  build.on('exit', function (code) {
    code == 0 ? resolve(code) : reject(code);
  });
});

// @TODO handle command injection from `out` variable by restricting characters to a-Z\/\\
const copyBuild = async (out) => new Promise((resolve, reject) => {
  const spawn = require('child_process').spawn,
  build = spawn(`docker run -v ${path.join(process.cwd(), path.dirname(out))}:/opt/out -i valist-build-image cp -R ${out} /opt/out`, { shell: true });

  build.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  build.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  build.on('exit', function (code) {
    code == 0 ? resolve(code) : reject(code);
  });
});

(async () => {
  await buildImage();
  await copyBuild('dist/main');
})();
