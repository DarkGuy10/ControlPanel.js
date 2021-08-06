const Client = require("./Client")
const Voucher = require("./Voucher")

class VoucherManager{
    /**
     * @constructor
     * @param {Client} client The client being used
     */
    constructor(client){
        this.client = client
        this.instance = client.instance
    }

    /**
     * Fetch a voucher from its id
     * @param {*} id 
     * @returns {Promise<Voucher>} Fetched voucher
     * @async
     */
    async fetch(id) {
        if(!id) throw new Error('\"id\" is a required parameter.')
        return this.instance.get(`/api/vouchers/${id}`)
            .then(response => new Voucher(response, this.client))
            .catch(() => false)
    }

    /**
     * Fetch all vouchers
     * @returns {Promise<Array<Voucher>>} An array of all vouchers
     * @async
     */
    async fetchAll(){
        const vouchers = []
        const pageCount = (await this.instance.get('/api/vouchers')).data['last_page']
        const promises = [...Array.keys(pageCount + 1)].slice(1).map(async page => {
            const data = (await this.instance.get(`/api/vouchers?page=${page}`)).data['data'].map(each => new Voucher(each, this.client))
            return data
        })
        for(const promise of promises)
            vouchers.pushArray(await promise)
        return vouchers
    }

    /**
     * Create a new voucher
     * @param {{memo?:string code:string uses:number credits:number expires_at?:string}} data An object containing voucher data
     * @returns {Promise<Voucher>} The newly created voucher
     * @async
     */
    async create(data){
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
        const response = await this.instance.post('/api/vouchers', voucherData)
        const voucher = new Voucher(response.data, this.client)
        return voucher
    }
}

// Utility function
Array.prototype.pushArray = function(arr) {
    this.push.apply(this, arr)
}

module.exports = VoucherManager