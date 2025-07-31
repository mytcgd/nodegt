FROM node:slim

WORKDIR /app

COPY package.json ./
RUN apt-get update && \
    apt-get install -y bash wget curl procps net-tools iputils-ping iptables && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    npm install

COPY app.js start.sh ./
RUN chmod +x start.sh

EXPOSE 3000

ENTRYPOINT [ "node", "app.js" ]
