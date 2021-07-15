FROM golang:buster
WORKDIR /opt/build
COPY ./examples/go-hello-world ./
RUN go build -o ./dist/main src/main.go 