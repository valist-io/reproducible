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
const path = require('path');
const { spawn, spawnSync } = require('child_process');
// @TODO Refactor to object
const generateDockerfile = (baseImage, source, buildCommand, installCommand) => {
    let dockerfile = `FROM ${baseImage}
WORKDIR /opt/build
COPY ${source} ./`;
    if (installCommand) {
        dockerfile += `\nRUN ${installCommand}`;
    }
    if (buildCommand) {
        dockerfile += `\nRUN ${buildCommand}`;
    }
    fs.writeFile('Dockerfile.reproducible', dockerfile, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err)
            throw err;
    }));
};
exports.generateDockerfile = generateDockerfile;
const createBuild = (imageTag, dockerfile = 'Dockerfile.reproducible') => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        // add ignore files to dockerignore
        spawnSync(`cat .*ignore > ${dockerfile}.dockerignore`, { shell: true });
        const build = spawn(`DOCKER_BUILDKIT=1 docker build -t ${imageTag} -f ${dockerfile} . --platform linux/amd64`, { shell: true });
        build.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        build.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        build.on('exit', (code) => (code === 0 ? resolve(code) : reject(code)));
    });
});
exports.createBuild = createBuild;
const exportBuild = (image, out) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const build = spawn(`docker run -v ${path.join(process.cwd(), path.dirname(out))}:/opt/out -i ${image} cp -R ${out} /opt/out`, { shell: true });
        build.stdout.on('data', (data) => {
            console.log(data.toString());
        });
        build.stderr.on('data', (data) => {
            console.log(data.toString());
        });
        build.on('exit', (code) => (code === 0 ? resolve(code) : reject(code)));
    });
});
exports.exportBuild = exportBuild;
//# sourceMappingURL=index.js.map