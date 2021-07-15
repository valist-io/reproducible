FROM golang:buster
WORKDIR /opt/build/src

RUN git clone -b v0.8.0 https://github.com/ipfs/go-ipfs.git && \
    git clone -b v0.7.0 https://github.com/ipfs/go-ds-s3.git

RUN cd go-ds-s3 && \
    go mod edit -replace "github.com/ipfs/go-ipfs=../go-ipfs"

RUN cd go-ipfs && \
    go mod edit -require="github.com/ipfs/go-ds-s3@v0.7.0" && \
    go mod edit -replace "github.com/ipfs/go-ipfs=../go-ds-s3" && \
    go mod tidy && \
    go get github.com/ipfs/go-ds-s3/plugin

RUN cd go-ipfs && \
    go build -trimpath -ldflags="-s -w -buildid=" -o ../dist/ipfs github.com/ipfs/go-ipfs/cmd/ipfs && \
    go build -trimpath --buildmode=plugin -o ../dist/go-ds-s3.so ../go-ds-s3/plugin/main/main.go
