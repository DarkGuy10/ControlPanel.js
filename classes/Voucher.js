const Client = require("./Client")
let instance

class Voucher{
    /**
     * @constructor
     * @param {Object} data An object containing voucher data
     * @param {Client} client The client being used
     */
    constructor(data, client){
        instance = client.instance
        this.id = data.id
        this.code = data.code
        this.memo = data.memo
        this.credits = data.credits
        this.uses = data.uses
        this.expires_at = data.expires_at
        this.created_at = data.created_at
        this.updated_at = data.updated_at
        this.used = data.used
        this.status = data.status
    }
    
    /**
     * Update this voucher
     * @param {{memo:?string, code:string, uses:number, credits:number, expires_at:?string}} data An object with updated voucher data
     * @returns {Promise<Voucher>} Updated self
     * @async
     */
    async update(data){
        const keyChecks = new Map()
        keyChecks.set('memo', arg => !arg || (typeof(arg) === 'string' && arg.length <= 191))
        keyChecks.set('code', arg => arg && typeof(arg) === 'string' && arg.length >= 4 && arg.length <= 36 && !/[^A-Za-z0-9-_]/.test(arg))
        keyChecks.set('uses', arg => arg && typeof(arg) === 'number' && arg <= 2147483647 && arg >= 1)
        keyChecks.set('credits', arg => arg && typeof(arg) === 'number' && arg < 99999999 && arg > 0)
        keyChecks.set('expires_at', arg => !arg || (typeof(arg) === 'string' && arg.length <= 10)) // This regex is fucking hard :/
        let voucherData = {}
        for(const key of keyChecks.keys()){
            if(!keyChecks.get(key)(data[key]))
                throw new Error('Arguement properties do not comply with rules. Check controlpanel docs for more details.')
            voucherData[key] = data[key]
        }
        const response = await instance.patch(`/api/vouchers/${this.id}`, voucherData)
        Object.assign(this, voucherData)
        return this
    }

    /**
     * Delete this voucher
     * @returns {Promise<void>} void
     * @async
     */
    async delete(){
        instance.delete(`/api/vouchers/${this.id}`)
    }
}
module.exports = Voucher