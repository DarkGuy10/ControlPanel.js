const Client = require("./Client")

class Server{
    /**
     * @constructor
     * @param {Object} data An object containing server data
     * @param {Client} client The client being used
     */
    constructor(data, client){
        Object.assign(this, data)
        this.client = client
        this.instance = client.instance
    }

    /**
     * Suspend this server
     * @returns {Promise<void>} void
     * @async
     */
    async suspend(){
        const response = await this.instance.patch(`/api/servers/${this.id}/suspend`)
        Object.assign(this, response.data)
    }

    /**
     * Unsuspend this server
     * @returns {Promise<void>} void
     * @async
     */
    async unsuspend(){
        const response = await this.instance.patch(`/api/servers/${this.id}/unsuspend`)
        Object.assign(this, response.data)
    }

    /**
     * Delete this server
     * @returns {Promise<void>} void
     * @async
     */
    async delete(){
        this.instance.delete(`/api/servers/${this.id}`)
    }
}
module.exports = Server