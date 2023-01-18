import dotenv from 'dotenv'

dotenv.config()

const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_DATABASE = process.env.DATABASE_DATABASE
const SERVER_PORT_ENV = process.env.SERVER_PORT
const SERVER_PORT = SERVER_PORT_ENV ? Number(SERVER_PORT_ENV) : 1313

export const config = {
  database: {
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DATABASE
  },
  server: {
    port: SERVER_PORT
  }
}