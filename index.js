const KOA = require('koa');
const app = new KOA()
const dotenv = require('dotenv');
dotenv.config();
const cors = require('@koa/cors');
const koaBody = require('koa-body');

const routes = require('./routes');
const db = require('./models/index')

const PORT = process.env.PORT
console.log(process.env.NODE_ENV);
app.use(cors())
app.use(koaBody())
app.context.db = db

app.on('error', (err, ctx) => {
    console.error('server error', err)
    ctx.body = err
  });

app.use(routes.routes(), routes.allowedMethods());

app.listen(PORT,() => console.log(`http://localhost:${PORT}`))