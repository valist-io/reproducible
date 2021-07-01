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
WORKDIR /opt/build/src
COPY src ./
RUN go build -o ./dist/main main.go
```

#### Example Run Script

```javascript
import reproducible from 'reproducible';

(async () => {
  // Generate a DockerFile for Build Pipeline
  reproducible.generateDockerfile('golang:buster', 'src', 'go build -o ./dist/main main.go');

  // Build artifacts using docker build system and export as image
  await reproducible.createBuild('valist-build-image');

  // Export build artifacts from image
  await reproducible.exportBuild({
    image: 'valist-build-image',
    out: `dist`,
  });
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