

const Koa =require ('koa')
const bodyParser=require ('koa-bodyparser')
const cors =require ('@koa/cors')
const router =require  ('./modules/router')

const app = new Koa()

app.use(cors())
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
const port = process.env.PORT || 5000;
app.listen(port, (err) => {
  if (err) throw err
  console.log('Server ready at http://localhost:5000')
  console.log('Process', port || 'development')
})
