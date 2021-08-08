const Client = require("./Client")
const Server = require("./Server")

class ServerManager{
    /**
     * @constructor
     * @param {Client} client The client being used
     */
    constructor(client){
        this.client = client
        this.instance = client.instance
    }

    /**
     * Fetch a server from its id
     * @param {string} id The id of server being fetched. This is NOT the pterodactyl id
     * @returns {Promise<Server>} Fetched server
     * @async
     */
    async fetch(id){
        if(!id) throw new Error('\"id\" is a required parameter.')
        return this.instance.get(`/api/servers/${id}`)
            .then(response => new Server(response.data, this.client))
            .catch(() => false)
    }

    /**
     * Fetch all servers
     * @returns {Promise<Array<Server>>} An array of all servers
     * @async
     */
    async fetchAll(){
        const servers = []
        const pageCount = (await this.instance.get('/api/servers?per_page=1000')).data['last_page']
        const promises =  [...Array(pageCount + 1).keys()].slice(1).map(async page => {
            const data = (await this.instance.get(`/api/servers?page=${page}&&per_page=1000`)).data['data'].map(each => new Server(each, this.client))
            return data
        })
        for(const promise of promises)
            servers.pushArray(await promise)
        return servers
    }
}

// Utility function
Array.prototype.pushArray = function(arr) {
    this.push.apply(this, arr)
}

module.exports = ServerManager