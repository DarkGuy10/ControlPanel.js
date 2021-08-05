const { default: axios } = require("axios")

class BaseClient{
    constructor(host, key) {
        this.host = host
        this.key = key
        this.instance = axios.create({
            baseURL: this.host,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.key}`
            }
        })
    }
}

module.exports = BaseClient