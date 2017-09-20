FROM node:4-slim
MAINTAINER Firef0x <Firefgx {aT} gmail.com>

# Working enviroment
ENV CNPMJS_ORG_USER="www-data" \
    CNPMJS_ORG_INSTALL_DIR="/var/app/cnpmjs.org" \
    CNPMJS_ORG_CONFIG_FILE="${CNPMJS_ORG_INSTALL_DIR}/config/config.js" \
    CNPMJS_ORG_DATA_DIR="/var/www" \
    CNPMJS_ORG_DOCS_DIR="${CNPMJS_ORG_INSTALL_DIR}/docs/web" \
    CNPMJS_ORG_VERSION=2.19.2

RUN \
    mkdir -p /var/app && \
    install -o ${CNPMJS_ORG_USER} -d /var/app && \
    mkdir ${CNPMJS_ORG_DATA_DIR} && chown -R ${CNPMJS_ORG_USER}:${CNPMJS_ORG_USER} ${CNPMJS_ORG_DATA_DIR}

USER ${CNPMJS_ORG_USER}

RUN \
    wget -P /tmp https://github.com/cnpm/cnpmjs.org/archive/${CNPMJS_ORG_VERSION}.tar.gz && \
    tar xvzf /tmp/${CNPMJS_ORG_VERSION}.tar.gz -C /var/app && \
    mv /var/app/cnpmjs.org-${CNPMJS_ORG_VERSION} ${CNPMJS_ORG_INSTALL_DIR}

WORKDIR ${CNPMJS_ORG_INSTALL_DIR}

COPY ./config.js ${CNPMJS_ORG_INSTALL_DIR}/config

RUN npm install oss-cnpm && \
    npm install

VOLUME ["${CNPMJS_ORG_CONFIG_FILE}", "${CNPMJS_ORG_DOCS_DIR}", "${CNPMJS_ORG_DATA_DIR}"]
EXPOSE 7001/tcp 7002/tcp

# Entrypoint
CMD ["/usr/local/bin/node", "/var/app/cnpmjs.org/dispatch.js"]
