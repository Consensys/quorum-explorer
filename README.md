# Quorum Explorer

## Table of Contents

- [Quorum Explorer](#quorum-explorer)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Prerequisites](#prerequisites)
  - [Local Usage](#local-usage)
  - [Going into Production](#going-into-production)
    - [Options](#options)
    - [Docker-Compose](#docker-compose)
    - [Building your own Docker container](#building-your-own-docker-container)
  - [Additional Features](#additional-features)
  - [Handy links:](#handy-links)
  - [Troubleshooting](#troubleshooting)
    - [Developing your app/DApp with React and web3js](#developing-your-appdapp-with-react-and-web3js)
    - [Solc doesn't compile on the frontend and requires a backend](#solc-doesnt-compile-on-the-frontend-and-requires-a-backend)

## Description

This is a lightweight explorer that is designed to get you up and running really quickly to give you an overview of yout chain.
It has not been designed for production use yet!

## Prerequisites

- [Nodejs](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com/)

## Local Usage

1. Start your existing network using something like the [Quorum Dev Quickstart](https://www.npmjs.com/package/quorum-dev-quickstart)
   or equivalent

2. Create a [config file](./src/config/config.json) with the nodes you wish to monitor
   1. Set the consensus algorithm of your network by the variable: `algorithm`. Values allowed include: `qbft`, `ibft`, `clique`, `raft`
   2. For each node in your network append the following format to the list:
      ```json
         {
            "name": "NODE_NAME", // this can be anything as long as it does not overlap with other nodes
            "client": "goquorum", // 'goquorum' or 'besu'
            "rpcUrl": "http://127.0.0.1:8545", // 'rpcUrl that the explorer can use to contact the nodes'
            "privateTxUrl": "" // if this is a besu-tessera or goquorum-tessera pairing, set the Url to Tessera here with the port e.g. http://127.0.0.1:9081; otherwise leave it as empty
         }
      ```
   3. If your node is a tessera pairing and you would like to make private transactions through the explorer, you will need to add two more settings along with the `privateTxUrl`:
      ```json
         "privateKey": "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63",
         "accountAddress": "0xfe3b557e8fb62b89f4916b721be55ceb828dbd73"
      ```
      The defaults given above and seen in the `config.json` provided are test accounts from the [quorum-dev-quickstart](https://github.com/ConsenSys/quorum-dev-quickstart).
      Given the sensitive nature of putting these keys in config, it is **not** recommended to use this feature in production. Due to some limitations, private transactions cannot be made through browser wallets such as MetaMask (although these features may yet come), so there is no alternative method of specifying private keys except in the config.
   4. Ensure that your final config is valid JSON by using [this validator](https://jsonlint.com/) or your own tool.

3. Create a `.env.local` in the root directory of this project

```bash
QE_BASEPATH="/explorer"
QE_CONFIG_PATH="path/to/config.json"
NODE_ENV=development
DISABLE_AUTH=true
NEXTAUTH_URL=http://localhost:25000
NEXTAUTH_URL_INTERNAL=http://localhost:25000
```

4. Start the application

```bash
npm i
npm run dev
```

5. For a production build refer to [Going into Production](#going-into-production)

## Going into Production

If you would like to use this application in a production environment, it is highly recommended that you enable authentication.

Take a look at the `.env.production` file for values that you can change:

### Options

**QE_BASEPATH**: set this to your preferred base URL path (defaults to : '/explorer')

**QE_CONFIG_PATH**: this is the path for the backend API to read off disk to get the node configuration information on the network. You should not change this if you are using the docker container as the config will be mounted to `/app/config.json` internally within the container.

**NODE_ENV**: leave this set to `production` in a prod environment

**DISABLE_AUTH**: setting this to `false` will *enable* authentication. (by default left on false for the best security practices)

**NEXTAUTH_URL**: set this to your domain without base path. Defaults to `http://localhost:25000` for local use.

**NEXTAUTH_URL_INTERNAL**: set this to an internally accessible URL for next auth to use. Defaults to `http://localhost:25000`.

**local_username** & **local_password**: If you want to use authentication but do not want to use OAuth, you can set the username and password here. Please note, although this is convenient, it is not recommended in a production environment.

The variables for the remainder can be left empty if not in use. Set the variables for any of the authentication options you would like to use.

### Docker-Compose

```yaml
services:
   explorer:
      image: consensys/quorum-explorer:latest
      volumes:
      - ./config.json:/app/config.json
      - ./.env.production:/app/.env.production
      ports:
      - 25000:25000/tcp
```

The above you can find a bare-minimum `docker-compose.yaml`. You should edit the locations of the `config.json` and `.env.production` depending on where they are located. Both of those files **must** be provided for the application to function. Please take a look at `.env.production` and `/config/config.json` in this repo for how to format.

### Building your own Docker container

1. `cd` to root of this repo
2. `docker build . -f Dockerfile -t YOUR_IMAGE:TAG`
3. Use the above docker-compose and substitute the image with your own as specified in your command.

## Additional Features

We welcome PRs for bugs or added functionality :) Please sign the CLA and submit a PR with your work for us to review.

If you raise an issue, please include steps for us to reproduce your issue so we can solve it faster.
## Handy links:

[Fontawesome icons ](https://fontawesome.com/v5/cheatsheet/free/solid)

## Troubleshooting

### Developing your app/DApp with React and web3js

We have made use of the solution below and so have left details in here for reference. Web3 has some issues
with React apps that make use of [Create React App](https://reactjs.org/docs/create-a-new-react-app.html), because
NodeJS polyfills are not included in v5 of create-react-app. Full details can be found
[here](https://github.com/ChainSafe/web3.js#web3-and-create-react-app)

To workaround this issue:

1. Create your new react app with create-react-app
2. Install [react-app-rewired](https://github.com/ChainSafe/web3.js#solution) and a few missing modules which should get your app working again.
   For reference, please see the [package.json](./package.json) of this project

### Solc doesn't compile on the frontend and requires a backend

Use a backend as well, either via express or something like NextJS(which is what we've done)
