const Client = require("./Client")
const User = require("./User")

class UserManager{
    /**
     * @constructor
     * @param {Client} client The client being used
     */
    constructor(client){
        this.client = client
        this.instance = client.instance
    }

    /**
     * Fetch a user from their id
     * @param {string} id The id of user being fetched. This is NOT the pterodactyl id
     * @returns {Promise<User>} Fetched user
     * @async
     */
    async fetch(id) {
        if(!id) throw new Error('\"id\" is a required parameter.')
        return this.instance.get(`/api/users/${id}`)
            .then(response => new User(response.data, this.client))
            .catch(() => false)
    }

    /**
     * Fetch all users
     * @returns {Promise<Array<User>>} An array of all users
     * @async
     */
    async fetchAll(){
        const users = []
        const pageCount = (await this.instance.get('/api/users')).data['last_page']
        const promises = [...Array(pageCount + 1).keys()].slice(1).map(async page => {
            const data = (await this.instance.get(`/api/users?page=${page}`)).data['data'].map(each => new User(each, this.client))
            return data
        })
        for(const promise of promises)
            users.pushArray(await promise)
        return users
    }

}

// Utility function
Array.prototype.pushArray = function(arr) {
    this.push.apply(this, arr)
}

module.exports = UserManager