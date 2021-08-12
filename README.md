# ControlPanelAPI.js
An API wrapper for [ControlPanel dashboard](https://github.com/ControlPanel-gg/dashboard), written in NodeJS <br>
ControlPanel provides a dashboard and billing-system for Pterodactyl hosts.

## Features
* Object-oriented
* Includes latest features
* 100% promise-based
* Uses discordjs#Collections data structures

## Example
```javascript
const {Client} = require('controlpanelapi.js')
let host = '' // Put dashboard url here
let key = '' // Put admin apikey here
const client = new Client(host, key)
client.servers.fetch('1')
    .then(async server => {
        server.delete()
    })
```
## Docs
[Docs lie here](https://darkguy10.github.io/ControlPanelAPI.js/)