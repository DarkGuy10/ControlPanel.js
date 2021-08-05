const BaseClient = require("./BaseClient")

class Client extends BaseClient{
    constructor(host, key) {
        super(host, key)
    }
}
module.exports = Client