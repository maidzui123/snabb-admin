FROM ubuntu:20.04

RUN apt-get update && \
    apt-get install -y ca-certificates curl gnupg
RUN mkdir -p /etc/apt/keyrings
RUN DEBIAN_FRONTEND=noninteractive && \
    curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
RUN apt-get update
RUN apt-get install nodejs tzdata supervisor -y && \
    cp /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && \
    mkdir -p /var/www/html

RUN npm install -g --force rimraf yarn
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
RUN echo ${NODE_ENV}


WORKDIR /var/www/html/
COPY . /var/www/html/
COPY .env.test /var/www/html/.env
COPY .env.test /var/www/html/.env.staging
COPY package.json /var/www/html/package.json
RUN cd /var/www/html && npm install --force && npm run buildstaging

ADD supervisord.conf /etc/supervisor/conf.d/supervisord.conf
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
