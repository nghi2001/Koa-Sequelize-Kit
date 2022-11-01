import dotenv from 'dotenv';
dotenv.config()

const config = (name, type = 'STRING') => {
      return type == 'STRING' ? process.env[name] : Number(process.env[name])
}
export default config