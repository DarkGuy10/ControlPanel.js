class VoucherManager{
    constructor(client){
        this.client = client
        this.instance = client.instance
    }
}
module.exports = VoucherManager