class UserManager{
    constructor(client){
        this.client = client
        this.instance = client.instance
    }
}
module.exports = UserManager