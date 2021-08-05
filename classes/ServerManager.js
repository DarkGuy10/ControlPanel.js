class ServerManager{
    constructor(client){
        this.client = client
        this.instance = client.instance
    }
}
module.exports = ServerManager