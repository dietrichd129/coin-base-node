// https://commerce.coinbase.com/docs/api/#webhooks
// https://www.npmjs.com/package/coinbase-commerce-node
// Coinbase Commerce need public Webhook for development. See README.md

const coinbase = require ('coinbase-commerce-node')
const db = require ('./db')

const Client = coinbase.Client.init('853752f0-b042-4498-a56e-8fff756c6fab')
const Charge = coinbase.resources.Charge

const checkout = async ({ total, name }) => {
	const chargeObj = new Charge({
		'name': 'Crypto Payment Strapsessions',
		'description': 'Strapsessions Checkout|| Contact support@strapsessions.com incase of difficulties',
		'logo_url': 'https://pixabay.com/get/54e6d14a4e4faa0df7c5997cc128317a1c39daec56_640.png',
		'metadata': {
			'customer_name': `${name}`
		},
		'local_price': {
			'amount': total,
			'currency': 'USD'
		},
		'pricing_type': 'fixed_price',
		'requested_info': ['name', 'email']
	})

	const payment = await chargeObj.save().then(res => ({ id: res.id, url: res.hosted_url }))
	return await db.insert(payment).then(res => res.url)

}

 const successPayment = async (id) => await db.updateOne({ id }, { status: 'success' })
 const updatePayment = async (id) => await db.updateOne({ id }, { status: 'pending' })
 const deletePayment = async (id) => await db.deleteOne({ id })

 module.exports = {
	checkout,
	successPayment,
	updatePayment,
	deletePayment
}
