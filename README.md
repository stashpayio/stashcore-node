Stashcore Node
============

A Stash full node for building applications and services with Node.js. A node is extensible and can be configured to run additional services. At the minimum a node has an interface to [Stash Core (stashd) v0.13.0](https://github.com/stashpayio/stash/tree/v0.13.0.x) for more advanced address queries. Additional services can be enabled to make a node more useful such as exposing new APIs, running a block explorer and wallet service.

## Usages

### As a standalone server

```bash
git clone https://github.com/stashpayio/stashcore-node
cd stashcore-node
npm install
./bin/stashcore-node start
```

When running the start command, it will seek for a .stashcore folder with a stashcore-node.json conf file.
If it doesn't exist, it will create it, with basic task to connect to stashd.

Some plugins are available :

- Insight-API : `./bin/stashcore-node addservice @stashcore/insight-api`
- Insight-UI : `./bin/stashcore-node addservice @stashcore/insight-ui`

You also might want to add these index to your stash.conf file :
```
-addressindex
-timestampindex
-spentindex
```

### As a library

```bash
npm install @stashcore/stashcore-node
```

```javascript
const stashcore = require('@stashcore/stashcore-node');
const config = require('./stashcore-node.json');

let node = stashcore.scaffold.start({ path: "", config: config });
node.on('ready', function() {
    //Stash core started
    stashd.on('tx', function(txData) {
        let tx = new stashcore.lib.Transaction(txData);
    });
});
```

## Prerequisites

- Stash Core (stashd) (v0.13.0) with support for additional indexing *(see above)*
- Node.js v8+
- ZeroMQ *(libzmq3-dev for Ubuntu/Debian or zeromq on OSX)*
- ~20GB of disk storage
- ~1GB of RAM

## Configuration

Stashcore includes a Command Line Interface (CLI) for managing, configuring and interfacing with your Stashcore Node.

```bash
stashcore-node create -d <stash-data-dir> mynode
cd mynode
stashcore-node install <service>
stashcore-node install https://github.com/yourname/helloworld
stashcore-node start
```

This will create a directory with configuration files for your node and install the necessary dependencies.

Please note that [Stash Core](https://github.com/stashpayio/stash/tree/master) needs to be installed first.

For more information about (and developing) services, please see the [Service Documentation](docs/services.md).

## Add-on Services

There are several add-on services available to extend the functionality of Bitcore:

- [Insight API](https://github.com/stashpayio/insight-api/tree/master)
- [Insight UI](https://github.com/stashpayio/insight-ui/tree/master)
- [Bitcore Wallet Service](https://github.com/stashpayio/stashcore-wallet-service/tree/master)

## Documentation

- [Upgrade Notes](docs/upgrade.md)
- [Services](docs/services.md)
  - [Stashd](docs/services/stashd.md) - Interface to Stash Core
  - [Web](docs/services/web.md) - Creates an express application over which services can expose their web/API content
- [Development Environment](docs/development.md) - Guide for setting up a development environment
- [Node](docs/node.md) - Details on the node constructor
- [Bus](docs/bus.md) - Overview of the event bus constructor
- [Release Process](docs/release.md) - Information about verifying a release and the release process.


## Setting up dev environment (with Insight)

Prerequisite : Having a stashd node already runing `stashd --daemon`.

Stashcore-node : `git clone https://github.com/stashpayio/stashcore-node -b develop`
Insight-api (optional) : `git clone https://github.com/stashpayio/insight-api -b develop`
Insight-UI (optional) : `git clone https://github.com/stashpayio/insight-ui -b develop`

Install them :
```
cd stashcore-node && npm install \
 && cd ../insight-ui && npm install \
 && cd ../insight-api && npm install && cd ..
```

Symbolic linking in parent folder :
```
npm link ../insight-api
npm link ../insight-ui
```

Start with `./bin/stashcore-node start` to first generate a ~/.stashcore/stashcore-node.json file.
Append this file with `"@stashcore/insight-ui"` and `"@stashcore/insight-api"` in the services array.

## Contributing

Please send pull requests for bug fixes, code optimization, and ideas for improvement. For more information on how to contribute, please refer to our [CONTRIBUTING](https://github.com/stashpayio/stashcore/blob/master/CONTRIBUTING.md) file.

## License

Code released under [the MIT license](https://github.com/stashpayio/stashcore-node/blob/master/LICENSE).

Copyright 2016-2018 Stash Core Group, Inc.

- bitcoin: Copyright (c) 2009-2015 Bitcoin Core Developers (MIT License)
