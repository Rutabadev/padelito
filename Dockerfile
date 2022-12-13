FROM amazon/aws-lambda-nodejs:16
RUN yum install -y xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib
COPY index.js package*.json cypress.config.js ./
COPY cypress ./cypress
ENV CYPRESS_CACHE_FOLDER=./node_modules/.cache
RUN npm ci
RUN npx cypress verify
CMD ["index.handler"]