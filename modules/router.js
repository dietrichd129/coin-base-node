const Router = require('koa-router');

const router = new Router()

const { checkout, successPayment, updatePayment, deletePayment } = require ('./coinbase')

router.get('/', async (ctx, next) => {
	ctx.body = 'Endpoint ready'
})

// get payment url
router.get('/checkout', async (ctx, next) => {
	let params = ctx.query || {}
	

	if (params && params.total && params.count) {
		return ctx.body = await checkout(params)
	}

	ctx.body = 'Coinbase Commerce checkout endpoint'
})

// webhook endpoint
router.post('/coinbase-webhook', async (ctx, next) => {
	const request = ctx.request.body
	console.log(request.event.id)
	if (request) {
		const id = request.event.id
		const event = request.event.type
console.log(request)
		if (event == 'charge:confirmed') return successPayment(id)
		if (event == 'charge:pending') return updatePayment(id)
		else if (event == 'charge:failed' || event == 'charge:delayed' || event == 'charge:resolved') return deletePayment(id)
	}

	ctx.body = 'Coinbase Commerce Webhook endpoint'
})

module.exports = router;