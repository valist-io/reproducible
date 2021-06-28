const Docker = require('dockerode');
const tar = require('tar-fs');
const path = require('path');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export const createImage = async (imageTag: string, dockerFilePath?: string) => {
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

export const runBuild = async ({ image, outputPath, artifacts } : any) => {
  const container = await docker.createContainer({
    Image: image,
    Cmd: ['cp', artifacts[0], '/opt/out'],
    HostConfig: {
      // Cleanup container
      AutoRemove: true,
      Mounts: [{
        Target: '/opt/out',
        Source: outputPath,
        Type: 'bind',
        ReadOnly: false,
      }],
    },
  });
  container.start();

  // Clear Build Cache
  docker.pruneBuilder();
};
