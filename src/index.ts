const Docker = require('dockerode');
const tar = require('tar-fs');
const path = require('path');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export const createImage = async (imageTag: string, dockerFilePath?: string) => {
  const context = dockerFilePath ? path.dirname(dockerFilePath) : process.cwd();
  const tarStream = tar.pack(context);
  const imageStream = await docker.buildImage(tarStream, { t: imageTag });

  const buildLog = await new Promise((resolve, reject) => {
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
  return buildLog;
};

export const runBuild = async ({
  image, buildPath, outputPath, artifacts,
} : any) => {
  const container = await docker.createContainer({
    Image: image,
    Cmd: ['cp', `${buildPath}/${artifacts[0]}`, `${buildPath}/${artifacts[0]}/output`],
    HostConfig: {
      // AutoRemove: true,
      Mounts: [{
        Target: buildPath,
        Source: outputPath,
        Type: 'bind',
        ReadOnly: false,
      }],
    },
  });

  container.start();
};
