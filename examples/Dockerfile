FROM golang:buster
WORKDIR /opt/valist/
RUN git clone -b reproducible https://github.com/nasdf/go-ipfs
WORKDIR /opt/valist/go-ipfs
RUN GOFLAGS=-trimpath make build