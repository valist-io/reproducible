const Docker = require('dockerode');
const tar = require('tar-fs');
const path = require('path');

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

export const createImage = async (dockerFilePath?: string) => {
  const context = dockerFilePath ? path.dirname(dockerFilePath) : process.cwd();
  const tarStream = tar.pack(context);
  const imageStream = await docker.buildImage(tarStream, { t: 'valist-build' });

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

export const createBuildEnv = async ({ image, command, source }: any) => {
  const container = await docker.createContainer({
    Image: image,
    Cmd: command,
    HostConfig: {
      AutoRemove: true,
      Mounts: [{
        Target: '/opt/valist/dist',
        Source: source,
        Type: 'bind',
        ReadOnly: false,
      }],
    },
  });

  container.start();
};
