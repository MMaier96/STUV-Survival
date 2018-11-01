<a href="/../../"> &larr; Back to the Main Page</a>
***
# Requirements
Here is a list of all requirements you need 
### 1. Install Node
You can download NodeJS with NPM right <a href="https://nodejs.org/en/">here</a>
 
### 2. Install Ionic
After you installed NodeJS with NPM you can simply install the Ionic package with:
```shell
  $ npm install -g ionic
```
 
### 3. Install Test Packages
 In order to run unit and end-to-end test for Ionic, you need to install Karma, Jasmine and Protractor for Node. Here is a simple command to install all of these in one step
 ```shel
  $ npm install --save-dev angular2-template-loader html-loader jasmine jasmine-spec-reporter karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-sourcemap-loader karma-webpack karma-coverage-istanbul-reporter istanbul-instrumenter-loader null-loader protractor ts-loader ts-node @types/jasmine @types/node

 ```
***
# Collaborating
### Serving the APP
```shell
  $ ionic serve
```


### Running tests
**Unit Tests:**
```shell
  $ npm run test
```


**E2E Tests:**
```shell
  $ npm run e2e
```
