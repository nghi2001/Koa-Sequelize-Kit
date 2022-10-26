import dotenv from 'dotenv';
dotenv.config()
const config = {
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
      host: process.env.HOST,
      dialect: process.env.DIALECT
}
export default config