# Reproducible

A library for coordinating reproducible builds with docker.

## Installation

```shell
npm install reproducible
```

## Usage

Check out the full `go-hello-world` reproducible build example in the [examples folder](/examples);

Example Build File

```Dockerfile
FROM golang:buster
WORKDIR /opt/build
COPY ./go-project/main.go ./
RUN go build main.go
```

Example Run Script

```javascript
import reproducible from 'reproducible';

(async () => {
  await reproducible.createImage('build-image');
  await reproducible.runBuild({
    image: 'build-image',
    buildPath: '/opt/build',
    outputPath: `${process.cwd()}/dist`,
    artifacts: ['main'],
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