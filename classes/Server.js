const Client = require("./Client")
let instance

class Server{
    /**
     * @constructor
     * @param {Object} data An object containing server data
     * @param {Client} client The client being used
     */
    constructor(data, client){
        this.id = data.id
        this.name = data.name
        this.description = data.description
        this.suspended = data.suspended
        this.identifier = data.identifier
        this.pterodactyl_id = data.pterodactyl_id
        this.user_id = data.user_id
        this.product_id = data.product_id
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.product = data.product ? {
            id:data.product.id,
            name: data.product.name,
            description: data.product.description,
            price: data.product.price,
            memory: data.product.memory,
            cpu: data.product.cpu,
            swap: data.product.swap,
            disk: data.product.disk,
            io: data.product.io,
            databases: data.product.databases,
            backups: data.product.backups,
            allocations: data.product.allocations,
            created_at: data.product.created_at,
            updated_at: data.product.updated_at,
            disabled: data.product.disabled
        } : undefined
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