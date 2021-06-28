FROM golang:buster
WORKDIR /opt/build
COPY ./examples/go-hello-world/go-project/main.go ./
RUN go build main.go