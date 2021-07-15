# Reproducible

A library for creating simple, reproducible environments with docker. Build artifacts reproducibly using the docker build system!

## Installation

```shell
npm install reproducible
```

## Usage

Check out the full `go-hello-world` reproducible build example in the [examples folder](/examples);
#### Example Build File

```Dockerfile
FROM golang:buster
WORKDIR /opt/build
COPY ./ ./
RUN go build -o ./dist/main src/main.go
```

#### Example Run Script

```javascript
import reproducible from 'reproducible';

(async () => {
  // Generate a DockerFile for Build Pipeline
  reproducible.generateDockerfile('golang:buster', './', 'go build -o ./dist/main src/main.go');

  // Build artifacts using docker build system and export as image
  await reproducible.createBuild('valist-build');

  // Export build artifacts from image
  await reproducible.exportBuild('valist-build','dist/main');
})();
```

## Building the Package

```shell
npm run build
```

## Maintainers

[@awantoch](https://github.com/awantoch)

[@jiyuu-jin](https://github.com/jiyuu-jin)

[@nasdf](https://github.com/nasdf)

## License

Reproducible is licensed under the [Mozilla Public License Version 2.0](https://www.mozilla.org/en-US/MPL/2.0/)