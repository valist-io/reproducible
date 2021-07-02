const fs = require('fs');
const Docker = require('dockerode');
const tar = require('tar-fs');
const path = require('path');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

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

export const createBuild = async (imageTag: string, dockerFilePath?: string) => {
  const context = dockerFilePath ? path.dirname(dockerFilePath) : process.cwd();
  const tarStream = tar.pack(context);
  const imageStream = await docker.buildImage(tarStream, { t: imageTag });

  await new Promise((resolve, reject) => {
    // Log the container build steps
    imageStream.pipe(process.stdout);

    docker.modem.followProgress(imageStream, (err: any, res: any) => {
      if (err) {
        reject(err);
      }
      resolve(res);
    });
  });

  console.log('Build has completed!');
  return true;
};

export const exportBuild = async ({ image, out } : any) => {
  const container = await docker.createContainer({
    Image: image,
    Cmd: ['sh', '-c', `cp -R ${out}/* /opt/out/`], // Won't copy hidden files
    HostConfig: {
      // Cleanup container
      AutoRemove: true,
      Mounts: [{
        Target: '/opt/out',
        Source: path.join(process.cwd(), out),
        Type: 'bind',
        ReadOnly: false,
      }],
    },
  });

  await container.start();
};
