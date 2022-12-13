FROM amazon/aws-lambda-nodejs:18

# Install Chrome to get all of the dependencies installed
ADD https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm chrome.rpm
RUN yum install -y ./chrome.rpm

COPY index.mjs package*.json puppeteer.config.cjs ./
RUN npm i --omit=dev
CMD [ "index.handler" ]