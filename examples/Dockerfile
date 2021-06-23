FROM golang:buster
WORKDIR /opt/valist/
RUN git clone https://github.com/ethereum/go-ethereum.git
WORKDIR /opt/valist/go-ethereum
RUN make geth
