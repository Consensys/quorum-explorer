# Quorum Explorer

## Table of Contents

1. [Description](#description)
2. [Prerequisites](#prerequisites)
3. [Usage](#usage)
4. [Development](#development)
5. [Troubleshooting](#troubleshooting)

## Description

This is a lightweight explorer that is designed to get you up and running really quickly to give you an overview of yout chain.
It has not been designed for production use yet!

## Prerequisites

- [Nodejs](https://nodejs.org/en/download/)

## Usage

1. Start your existing network using something like the [Quorum Dev Quickstart](https://www.npmjs.com/package/quorum-dev-quickstart)
   or equivalent

2. Create a [config file](./src/config/config.json) with the nodes you wish to monitor

3. Create a .env.local in your local project 
(if you would like to change these values, otherwise basepath will default to / and local app will refer to ./src/config/config.json for the config)

```bash
NEXT_PUBLIC_QE_BASEPATH="/explorer"
QE_CONFIG_PATH="path/to/config.json"
ENV NODE_ENV=development
```

4. Start the application

```bash
npm i
# create an .env.local at the root of the project with the following in it (without the hashes)
# QE_BACKEND_URL="http://localhost:25000"
# QE_CONFIG_PATH="src/config/config.json"
npm run dev
```

4. For a production build:

```bash
npm i
npm run lint
npm run build
npm run start
```

## Development

We welcome PRs for bugs or added functionality :) Please sign the CLA and submit a PR with your work for us to review.

If you raise an issue, please include steps for us to reproduce your issue so we can solve it faster.

## Handy links:

[Fontawesome icons ](https://fontawesome.com/v5/cheatsheet/free/solid)

## Troubleshooting

### 1. Developing your app/DApp with [React](https://reactjs.org/) and [web3](https://www.npmjs.com/package/web3)

We have made use of the solution below and so have left details in here for reference. Web3 has some issues
with React apps that make use of [Create React App](https://reactjs.org/docs/create-a-new-react-app.html), because
NodeJS polyfills are not included in v5 of create-react-app. Full details can be found
[here](https://github.com/ChainSafe/web3.js#web3-and-create-react-app)

To workaround this issue:

1. Create your new react app with create-react-app
2. Install [react-app-rewired](https://github.com/ChainSafe/web3.js#solution) and a few missing modules which should get your app working again.
   For reference, please see the [package.json](./package.json) of this project

### 2. Solc doesn't compile on the frontend and requires a backend

Use a backend as well, either via express or something like NextJS(which is what we've done)


### TODO:
- multi contracts - types for list, bytes, I think addresses work?
- test multi params for the write functions & constructor