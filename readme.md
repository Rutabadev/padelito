# Padelito
Automated booking of a padel court with puppeteer.

## Stack
 - Puppeteer is used to automate the booking process.
 - Deployed to AWS Lambda with a puppeteer and puppeteer_core in layers.

## Usage
The app won't actually book the court unless the `BOOK` environment variable is set to `true`.
Create an EventBridge rule to trigger the lambda function at the desired time (midnight 7 days before the day you want to play).

### Local
Mac : impossible

Windows : via docker
* Build the docker image : `docker build -t padelito .`
* Run the docker image : `docker run -p 9000:8080 -v ${pwd}/screenshots:/var/task/screenshots padelito:latest`
* curl the lambda function : `curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d '{"horaire": "13:30"}''`

## Deployment
Update the code or the layers directly in AWS Console.
