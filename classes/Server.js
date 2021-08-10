const Client = require("./Client")
let instance

class Server{
    /**
     * @constructor
     * @param {Object} data An object containing server data
     * @param {Client} client The client being used
     */
    constructor(data, client){
        Object.assign(this, data)
        instance = client.instance
    }

    /**
     * Suspend this server
     * @returns {Promise<void>} void
     * @async
     */
    async suspend(){
        const response = await instance.patch(`/api/servers/${this.id}/suspend`)
        Object.assign(this, response.data)
    }

    /**
     * Unsuspend this server
     * @returns {Promise<void>} void
     * @async
     */
    async unsuspend(){
        const response = await instance.patch(`/api/servers/${this.id}/unsuspend`)
        Object.assign(this, response.data)
    }

    /**
     * Delete this server
     * @returns {Promise<void>} void
     * @async
     */
    async delete(){
        instance.delete(`/api/servers/${this.id}`)
    }

    /**
     * Transforms object data to JSON format
     * @returns {Object} Object data in JSON format
     */
    toJSON(){
        let data = {}
        Object.keys(this).filter(key => typeof(this[key]) != 'function').forEach(key => {
            data[key] = this[key]
        })
        return JSON.stringify(data)
    }
}
module.exports = Server