# Padelito

Automated booking of a padel court with puppeteer.

## Stack

 - Puppeteer is used to automate the booking process.
 - Deployed to AWS Lambda as a Docker image.

## Usage

The app won't actually book the court unless the `BOOK` environment variable is set to `true`.

### Local
`npm start --horaire={mm:ss}` defaults to 18:00.

### Deployed
Create an EventBridge rule to trigger the lambda function at the desired time (midnight 7 days before the day you want to play).

## Deployment

You will need to have Docker and AWS CLI installed.

- Build the docker image with `docker build -t padelito .`
- Run it locally with `docker run -p 9000:8080 padelito:latest`
- Test it with `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"horaire": "17:00"}'`
- Tag the image with `docker tag padelito:latest 860916594587.dkr.ecr.us-east-1.amazonaws.com/padelito:latest`
- Push the image to ECR with `docker push 860916594587.dkr.ecr.us-east-1.amazonaws.com/padelito:latest`
- Deploy the lambda function with `aws lambda update-function-code --function-name padelito --image-uri 860916594587.dkr.ecr.us-east-1.amazonaws.com/padelito:latest`