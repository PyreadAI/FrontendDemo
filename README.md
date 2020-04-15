Disclaim: This is only used for demo purpose, do not distribute without permission.
## How to install
1. open index.html directly
### Setup
1. yarn install
2. under /view_engine or /s3bucket webpack
3. for dev: under /view_engine or /s3bucket, npm run dev
4. OPTIONAL: npm install -g claudia

### LAMBDA API default entry
"url": NA (For Demo: https://pyreadai.github.io/FrontendDemo/)
### S3 default ENDPOINT
"url": NA (For Demo: https://pyreadai.github.io/FrontendDemo/)

### AWS COGNITO

#### FRONTEND
(choose a password that contains at least one upper-case letter, a number, and a special character)

### LAMBDA API deploy/update using claudia.js
npm run update

### update ALL from/to /view_engine to/from s3 
[s3]sync remote to local: aws s3 sync ./dir .
[s3]sync local to remote: aws s3 sync . ./dir --exclude 'node_modules/*'

DEMO: http://hestia-private-order-system-demo.s3-website-us-west-2.amazonaws.com

#### LAMBDA entry: index.js S3 entry: /s3bucket

#### Lambda proxy wrapper with claudia for express app
entry: app.js
command: claudia generate-serverless-express-proxy --express-module app
