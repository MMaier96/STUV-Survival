<a href="/../../"> &larr; Back to the Main Page</a>
# Getting Started
## Requirements
Here is a list of all requirements you need 
### 1. Install Node
 
### 2. Install Ionic
 
### 3. Install Test Packages
 In order to run unit and end-to-end test for Ionic, you need to install Karma, Jasmine and Protractor for Node. Here is a simple command to install all of these in one step
 ```shel
  $ npm install --save-dev angular2-template-loader html-loader jasmine jasmine-spec-reporter karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-sourcemap-loader karma-webpack karma-coverage-istanbul-reporter istanbul-instrumenter-loader null-loader protractor ts-loader ts-node @types/jasmine @types/node

 ```
## Collaborating
### Serving the APP
```shell
  $ ionic serve
```
### Running tests
**Unit Tests:**
```shell
  $ npm run test
```
<br/>
**E2E Tests:**
```shell
  $ npm run e2e
```
