"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportBuild = exports.createBuild = exports.generateDockerfile = void 0;
const fs = require('fs');
const Docker = require('dockerode');
const tar = require('tar-fs');
const path = require('path');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const generateDockerfile = (baseImage, source, buildCommand, installCommand) => {
    let dockerfile = `FROM ${baseImage}
WORKDIR /opt/build/${source}
COPY ${source} ./`;
    if (installCommand) {
        dockerfile += `\nRUN ${installCommand}`;
    }
    if (buildCommand) {
        dockerfile += `\nRUN ${buildCommand}`;
    }
    fs.writeFile('Dockerfile', dockerfile, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
    }));
};
exports.generateDockerfile = generateDockerfile;
const createBuild = (imageTag, dockerFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const context = dockerFilePath ? path.dirname(dockerFilePath) : process.cwd();
    const tarStream = tar.pack(context);
    const imageStream = yield docker.buildImage(tarStream, { t: imageTag });
    yield new Promise((resolve, reject) => {
        // Log the container build steps
        imageStream.pipe(process.stdout);
        docker.modem.followProgress(imageStream, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
    console.log('Build has completed!');
    return true;
});
exports.createBuild = createBuild;
const exportBuild = ({ image, out }) => __awaiter(void 0, void 0, void 0, function* () {
    const container = yield docker.createContainer({
        Image: image,
        Cmd: ['sh', '-c', `cp -R ${out}/* /opt/out/`],
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
    yield container.start();
});
exports.exportBuild = exportBuild;
//# sourceMappingURL=index.js.map