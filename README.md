# ControlPanel.js
An API wrapper for [ControlPanel dashboard](https://github.com/ControlPanel-gg/dashboard) <br>
ControlPanel provides a dashboard and billing-system for Pterodactyl hosts.

## Example
```javascript
const {Client} = require('controlpanel.js')
let host = '' // Put dashboard url here
let key = '' // Put admin apikey here
const client = new Client(host, key)
client.servers.fetch('1')
    .then(async server => {
        server.delete()
    })
```
## Docs
[Docs lie here](https://darkguy10.github.io/ControlPanel.js/)