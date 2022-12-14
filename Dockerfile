FROM public.ecr.aws/lambda/nodejs:18

COPY package*.json index.mjs ./
RUN npm i

CMD [ "index.handler" ]