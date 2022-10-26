// const KOA = require('koa');
import KOA from 'koa'
const app = new KOA()
// const dotenv = require('dotenv');
// dotenv.config();
// const cors = require('@koa/cors');
// const koaBody = require('koa-body');

const routes = require('./routes');
import * as dotenv from 'dotenv';
dotenv.config();
import cors from '@koa/cors'
import koaBody from 'koa-body';

const PORT = process.env.PORT
console.log(process.env.PASSWORD);
app.use(cors())
app.use(koaBody())
// app.context.db = db

app.on('error', (err, ctx) => {
  // console.log(err);
  ctx.status = err.status || 500
  ctx.body = {
    code: err.status || 500,
    msg: err.message
  }
});

app.use(routes.routes(), routes.allowedMethods());

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))