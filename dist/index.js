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
exports.createBuildEnv = exports.createImage = void 0;
const Docker = require('dockerode');
const tar = require('tar-fs');
const path = require('path');
const docker = new Docker({ socketPath: '/var/run/docker.sock' });
const createImage = (dockerFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const context = dockerFilePath ? path.dirname(dockerFilePath) : process.cwd();
    const tarStream = tar.pack(context);
    const imageStream = yield docker.buildImage(tarStream, { t: 'valist-build' });
    const buildLog = yield new Promise((resolve, reject) => {
        // Log the container build steps
        imageStream.pipe(process.stdout);
        docker.modem.followProgress(imageStream, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
    console.log("Build has completed!");
});
exports.createImage = createImage;
const createBuildEnv = ({ image, command, source }) => __awaiter(void 0, void 0, void 0, function* () {
    const container = yield docker.createContainer({
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
});
exports.createBuildEnv = createBuildEnv;
//# sourceMappingURL=index.js.map