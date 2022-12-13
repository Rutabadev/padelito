FROM amazon/aws-lambda-nodejs:18
COPY main.mjs package*.json puppeteer.config.cjs ./
RUN npm i --production
CMD [ "index.mjs.handler" ]