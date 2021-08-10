const Client = require("./Client")
let instance

class User{
    /**
     * @constructor
     * @param {Object} data An object containing user data
     * @param {Client} client The client being used
     */
    constructor(data, client){
        instance = client.instance
        this.id = data.id
        this.name = data.name
        this.role = data.role
        this.credits = data.credits
        this.server_limit = data.server_limit
        this.pterodactyl_id = data.pterodactyl_id
        this.avatar = data.avatar
        this.email = data.email
        this.email_verified_at = data.email_verified_at
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.ip = data.ip
        this.last_seen = data.last_seen
        this.discord_verified_at = data.discord_verified_at
    }

    /**
     * Update this user
     * @param {{name:?string, email:?string, credits:?number, server_limit:?number, role:?('admin' | 'mod' | 'client' | 'member')}} data An object with updated user data
     * @returns {Promise<User>} Updated self
     * @async
     */
    async update(data){
        const allowedKeys = ['name', 'email', 'credits', 'server_limit', 'role']
        if(!allowedKeys.some(key => data[key]))
            throw new Error('None of the arguement properties lie in the allowed list: ' + allowedKeys.join(', '))

        let newData = {}
        allowedKeys.filter(key => data[key]).forEach(key => {newData[key] = data[key]})

        const response = await instance.patch(`/api/users/${this.id}`, data)
        Object.assign(this, newData)
        return this
    }

    /**
     * Delete this user
     * @returns {Promise<void>} void
     * @async
     */
    async delete(){
        instance.delete(`/api/users/${this.id}`)
    }

    /**
     * Increment credits for this user
     * @param {number} credits Amount of credits to increment
     * @returns {Promise<void>} void
     * @async
     */
    async incrementCredits(credits){
        if(!credits || !typeof(credits) === 'number')
            throw new Error('\"credits\" is a required *numerical* arguement.')
        const response = await instance.patch(`/api/users/${this.id}/increment`, {credits: credits})
        Object.assign(this, response.data)
    }

    /**
     * Decrement credits for this user
     * @param {number} credits Amount of credits to decrement
     * @returns {Promise<void>} void
     * @async
     */
    async decrementCredits(credits){
        if(!credits || !typeof(credits) === 'number')
            throw new Error('\"credits\" is a required *numerical* arguement.')
        const response = await instance.patch(`/api/users/${this.id}/decrement`, {credits: credits})
        Object.assign(this, response.data)
    }

    /**
     * Increment server limit for this user
     * @param {number} server_limit Number by which server limit is incremented
     * @returns {Promise<void>} void
     * @async 
     */
    async incrementServerLimit(server_limit){
        if(!server_limit || !typeof(server_limit) === 'number')
            throw new Error('\"server_limit\" is a required *numerical* arguement.')
        const response = await instance.patch(`/api/users/${this.id}/increment`, {server_limit: Math.trunc(server_limit)})
        Object.assign(this, response.data)
    }

    /**
     * Decrement server limit for this user
     * @param {number} server_limit Number by which server limit is decremented
     * @returns {Promise<void>} void
     * @async
     */
    async decrementServerLimit(server_limit){
        if(!server_limit || !typeof(server_limit) === 'number')
            throw new Error('\"server_limit\" is a required *numerical* arguement.')
        const response = await instance.patch(`/api/users/${this.id}/decrement`, {server_limit: Math.trunc(server_limit)})
        Object.assign(this, response.data)
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
module.exports = User