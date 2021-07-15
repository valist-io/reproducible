const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

// @TODO Refactor to object
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

export const createBuild = async (imageTag: string, dockerfile?: string) => new Promise((resolve, reject) => {
  let dockerFilePath = '';
  if (dockerfile) dockerFilePath = ` -f ${dockerfile}`;
  console.log(`docker build -t ${imageTag}${dockerFilePath} . --platform linux/amd64`);
  const build = spawn(`docker build -t ${imageTag}${dockerFilePath} .`, { shell: true });

  build.stdout.on('data', (data: any) => {
    console.log(data.toString());
  });

  build.stderr.on('data', (data: any) => {
    console.log(data.toString());
  });

  build.on('exit', (code: any) => (code === 0 ? resolve(code) : reject(code)));
});

export const exportBuild = async (image: any, out: any) => new Promise((resolve, reject) => {
  const build = spawn(`docker run -v ${path.join(process.cwd(),
    path.dirname(out))}:/opt/out -i ${image} cp -R ${out} /opt/out`, { shell: true });

  build.stdout.on('data', (data: any) => {
    console.log(data.toString());
  });

  build.stderr.on('data', (data: any) => {
    console.log(data.toString());
  });

  build.on('exit', (code: any) => (code === 0 ? resolve(code) : reject(code)));
});
