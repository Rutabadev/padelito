# Padelito
Automated booking of a padel court with puppeteer.

## Stack
 - Puppeteer is used to automate the booking process.
 - Deployed to AWS Lambda as a with a layer.

## Usage
The app won't actually book the court unless the `BOOK` environment variable is set to `true`.

### Local
Impossible right now (possible with docket on windows).

### Deployed
Create an EventBridge rule to trigger the lambda function at the desired time (midnight 7 days before the day you want to play).

## Deployment
Update the code or the layer directly in AWS Console.
