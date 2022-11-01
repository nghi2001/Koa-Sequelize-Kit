import KOA from 'koa'
import morgan from 'koa-morgan'
import serve from 'koa-static'
const routes = require('./routes')
import * as dotenv from 'dotenv'
dotenv.config()
import cors from '@koa/cors'
import koaBody from 'koa-body'
import db from './models'

const app = new KOA()
const PORT = process.env.PORT

app.use(morgan("tiny"))
app.use(cors())
app.use(koaBody())
app.use(serve('./public'));

app.context.db = db

app.on('error', (err, ctx) => {
  console.log(err);
  ctx.status = err.status || 500
  ctx.body = {
    code: err.status || 500,
    msg: err.message
  }
})

app.use(routes.routes(), routes.allowedMethods())

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))