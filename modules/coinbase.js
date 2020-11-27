// https://commerce.coinbase.com/docs/api/#webhooks
// https://www.npmjs.com/package/coinbase-commerce-node
// Coinbase Commerce need public Webhook for development. See README.md

const coinbase = require ('coinbase-commerce-node')
const db = require ('./db')

const Client = coinbase.Client.init('5c0d9cd6-bbd0-4255-9aee-2254a602dda4')
const Charge = coinbase.resources.Charge

const checkout = async ({ total, count }) => {
	const chargeObj = new Charge({
		'name': 'Monthly subscription',
		'description': `Payment for services for ${count} months`,
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