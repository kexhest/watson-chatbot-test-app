# Watson Chatbot Test App

> Created on June 11, 2017, 22:44.

[![node](https://img.shields.io/badge/node-v8.1.0-brightgreen.svg)]()
[![npm](https://img.shields.io/badge/npm-v5.0.3-brightgreen.svg)]()

## Installation
If you've never used Node or yarn before, you'll need to install them.
If you use homebrew, just run:

```
brew install node
brew install yarn
```

Otherwise, you can download and install from [here](http://nodejs.org/download/) and [here](https://yarnpkg.com/en/docs/install).

### Install dependencies
```
yarn install
```

This runs through all dependencies listed in `yarn.lock` and installs them locally within the project.

## Bluemix

This repository has a node backend that communicates with the watson cloud platform. It uses the conversation and tone analyzer platforms. They are triggerd in the create function within the `app/controllers/messageController.js` file. Getting the tone (emotion) of each message makes it a bit slow, so if you just want to try out the conversation api I suggest you disable the nested calls and just use the conversation call to make the request.

To setup your own chatbot you'll have to create an [IBM Bluemix](https://www.ibm.com/cloud-computing/bluemix/) account. Head over to the [conversation](https://www.ibm.com/watson/developercloud/conversation.html) page and follow the instructions there to setup your workspace.

You'll need a workspace id for your intents/entities and dialog. As well as url/username and password to authenticate to your bluemix project.

These are then defined in `.env` (copy the .env.dist file in the root of this project) and then used throughout the application.

### Running build scripts
```
yarn start
```

This will compile your assets and serve them over browser-sync with [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) and [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware), proxied through the domain specified in host.js.

### Building for production
```
yarn build
```
This will minify and hash all assets etc.

### Testing with Jest
This repo includes a test suite running [Jest](https://facebook.github.io/jest/).

To run the tests simply run:
```
yarn test
```

### Code style
This repo uses a custom [eslint](https://eslint.org) style guide. It also includes some default editor settings using [editor config](https://github.com/sindresorhus/editorconfig-sublime).
