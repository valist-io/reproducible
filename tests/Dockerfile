FROM golang:buster
WORKDIR /opt/valist
RUN git clone git@github.com:valist-io/example-releases.git
WORKDIR /opt/valist/example-releases/binary
RUN go build main.go