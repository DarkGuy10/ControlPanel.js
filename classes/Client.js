const { default: axios } = require("axios")
const ServerManager = require("./ServerManager")
const UserManager = require("./UserManager")
const VoucherManager = require("./VoucherManager")

class Client{
    constructor(host, key) {
        this.host = host
        this.key = key
        this.servers = new ServerManager(this)
        this.users = new UserManager(this)
        this.vouchers = new VoucherManager(this)
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

module.exports = Client