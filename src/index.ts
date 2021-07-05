const fs = require('fs');
const path = require('path');

export const generateDockerfile = (
  baseImage: string,
  source: string,
  buildCommand?: string,
  installCommand?: string,
) => {
  let dockerfile = `FROM ${baseImage}
WORKDIR /opt/build
COPY ${source} ./`;

  if (installCommand) {
    dockerfile += `\nRUN ${installCommand}`;
  }

  if (buildCommand) {
    dockerfile += `\nRUN ${buildCommand}`;
  }

  fs.writeFile('Dockerfile', dockerfile, async (err: any) => {
    if (err) throw err;
  });
};

export const createBuild = async (imageTag: string) => new Promise((resolve, reject) => {
  const spawn = require('child_process').spawn,
  build = spawn(`docker build -t ${imageTag} .`, { shell: true });

  build.stdout.on('data', (data: any) => {
    console.log(data.toString());
  });

  build.stderr.on('data', (data: any) => {
    console.log(data.toString());
  });

  build.on('exit', (code: any) => {
    code == 0 ? resolve(code) : reject(code);
  });

  console.log('Build has completed!');
  return true;
});

export const exportBuild = async (image: any, out: any) => new Promise((resolve, reject) => {
  let imageName = 'valist-build';
  if (image) {
    imageName = image;
  }
  
  const spawn = require('child_process').spawn,
  build = spawn(`docker run -v ${path.join(process.cwd(), path.dirname(out))}:/opt/out -i ${imageName} cp -R ${out} /opt/out`, { shell: true });

  build.stdout.on('data', function (data: any) {
    console.log(data.toString());
  });

  build.stderr.on('data', function (data: any) {
    console.log(data.toString());
  });

  build.on('exit', function (code: any) {
    code == 0 ? resolve(code) : reject(code);
  });
});
