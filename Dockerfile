FROM node:slim

WORKDIR /app

ARG PORT=3000
ENV PORT=$PORT
EXPOSE $PORT

COPY package.json ./
RUN apt-get update && \
    apt-get install -y bash wget curl procps net-tools iputils-ping iptables && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    npm install

COPY app.js start.sh ./
RUN chmod +x start.sh

ENTRYPOINT [ "node", "app.js" ]
