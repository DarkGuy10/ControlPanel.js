const Client = require("./Client")

class Server{
    /**
     * @constructor
     * @param {Object} data An object containing server data
     * @param {Client} client The client being used
     */
    constructor(data, client){
        this = {
            ...data
        }
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
        this = new Server(response.data, this.client)
    }

    /**
     * Unsuspend this server
     * @returns {Promise<void>} void
     * @async
     */
    async unsuspend(){
        const response = await this.instance.patch(`/api/servers/${this.id}/unsuspend`)
        this = new Server(response.data, this.client)
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